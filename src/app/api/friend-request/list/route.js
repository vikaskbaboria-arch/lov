// app/api/friend-request/send/route.js

import connectDB from "@/lib/connectDB";
import FriendRequest from "@/models/friendRequest.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(req) {

   try{
    const session = await getServerSession(authOptions)
      await connectDB();
      const request = await FriendRequest.find({receiverId:session?.user?.id})

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