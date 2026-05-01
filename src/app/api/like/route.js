import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Like from "@/models/like.model.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
        try{
         await connectDB();
         const session  = await getServerSession(authOptions);
           if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
           } 
           const {postId} = await req.json();
           if(!postId){
            return NextResponse.json({error:"Post ID is required"},{status:400})
           }
           const userId = session?.user?.id;
           let Liked = await Like.findOne({userId:userId,postId:postId})
            if(Liked){
                 Liked = await Like.deleteOne({userId:userId,postId:postId})
                  return NextResponse.json(
                    { liked: false, message: "Unliked" },
                    { status: 200 }
                );
            }
            else{
                Liked = await Like.create({userId:userId,postId:postId})
                  return NextResponse.json(
                    { liked: true, message: "liked" },
                    { status: 200 }
                );
            }
            
           
        
        }
        catch(error){
            console.error(error);
        }
}