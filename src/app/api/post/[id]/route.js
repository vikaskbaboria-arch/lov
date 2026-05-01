import connectDB from "@/lib/connectDB";
import Post from "@/models/post.model.js"
import User from "@/models/User.model.js"
import { NextResponse } from "next/server";
export const GET = async (req, context) =>{
     try{
        await connectDB();
         const params = await context.params; 
        const userId = params?.id
         const postData = await Post.find({ user: userId }) // ✅ get ALL posts
      .sort({ createdAt: -1 });
        if(!postData){
            return NextResponse.json({message:"Post not found"}, {status:404})
        }
        return NextResponse.json(postData, {status:200})
     }
        catch(err){
            console.log(err);
        }


}