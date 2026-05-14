import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Post from '@/models/post.model.js'
import Comment from "@/models/comment.model.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export const POST = async(req)=>{
    try {
        await connectDB();
           const session  = await getServerSession(authOptions);
        const userId = session?.user?.id
        const{postId,text} = await req.json();
        console.log("post id",postId)
        console.log("text",text)
        console.log("userId",userId)
        if(!postId || !text){
            return NextResponse.json({error:"Caption and comment text are required"},{status:400})
        }
        const user = await User.findById(userId)
        
        if(!user){
            return NextResponse.json({error:"User not found"},{status:401})
        }
            const post = await Post.findById(postId)
        if(!post){
            return NextResponse.json({error:"Post not found"},{status:404})
        }
        
        const comment = await Comment.create({user:userId,postId:postId,text:text})
        return NextResponse.json(comment,{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"Failed to create comment. Please try again"},{status:500})
    }
}