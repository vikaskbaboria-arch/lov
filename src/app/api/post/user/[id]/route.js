import connectDB from "@/lib/connectDB";
import Post from "@/models/post.model.js"
import User from "@/models/User.model.js"
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
export const GET = async (req, context) =>{
     try{
        await connectDB();
        const session = await getServerSession(authOptions)
         const params = await context.params; 
        const userId = params?.id
        const isAdmin = session?.user?.id === userId;
         const postData = await Post.aggregate([
               {  
         $match: {
  user: new mongoose.Types.ObjectId(userId),
  ...(isAdmin
    ? {}
    : { isAnonymous: { $ne: true } }),
}
               },
              {
           $lookup: {
             from: "comments",
             let: { postId: "$_id" },
             pipeline: [
               {
                 $match: {
                   $expr: { $eq: ["$postId", "$$postId"] }
                 }
               },
               {
                 $lookup: {
                   from: "users",
                   localField: "user",
                   foreignField: "_id",
                   as: "user"
                 }
               },
               {
                 $unwind: "$user"
               },
               {
                 $project: {
                   text: 1,
                   createdAt: 1,
                   "user._id": 1,
                   "user.name": 1,
                   "user.profilePic": 1
                 }
               }
             ],
             as: "comments"
           }
         },
               {
                 $lookup:{
                   from:"likes",
                   localField: "_id",
                   foreignField: "postId",
                   as: "likes"
                 }
               },
                {
             $lookup: {
               from: "users",
               localField: "user",
               foreignField: "_id",
               as: "user"
             }
           },
           {
             $unwind: "$user"
           },
           {
             $addFields: {
               user: {
                 $cond: {
                   if:  { $eq: ["$isAnonymous", true] },
                   then: {
                     _id: null,
                     username: "Anonymous",
                     profilePic: null,
                     name: "Anonymous"
                   },
                   else: {
                     _id: "$user._id",
                     username: "$user.username",
                     profilePic: "$user.profilePic",
                     name: "$user.name"
                   }
                 }
               }
             }
           },
              {
             $addFields: {
               totalComments: { $size: "$comments" },
               totalLikes: { $size: "$likes" },
               isLiked: {
                 $in: [new mongoose.Types.ObjectId(session?.user?.id), "$likes.userId"]
               }
              
             }
           },
           {
             $sort: { createdAt: -1 }
           }
             ])
        if(!postData){
            return NextResponse.json({message:"Post not found"}, {status:404})
        }
        return NextResponse.json(postData, {status:200})
     }
        catch(err){
            console.log(err);
        }


}
