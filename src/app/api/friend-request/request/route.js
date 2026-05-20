// app/api/friend-request/send/route.js

import connectDB from "@/lib/connectDB";
import FriendRequest from "@/models/friendRequest.model";
import { NextResponse } from "next/server";

export async function POST(req) {

   try{

      await connectDB();

      const { senderId, receiverId } =
         await req.json();

      if(senderId === receiverId){
         return NextResponse.json({
            success:false,
            message:"Cannot send request to yourself"
         });
      }

      const existing = await FriendRequest.findOne({
         sender: senderId,
         receiver: receiverId,
         status:"pending"
      });

      if(existing){
         return NextResponse.json({
            success:false,
            message:"Request already sent"
         });
      }

      const request = await FriendRequest.create({
         sender: senderId,
         receiver: receiverId,
      });

      return NextResponse.json({
         success:true,
         request,
      });

   }catch(error){
    console.error(error)
      return NextResponse.json({
         success:false,
         message:error.message
      });
   }
}