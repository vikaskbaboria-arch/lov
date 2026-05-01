import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Follow from "@/models/follower.model";
export const GET = async (req,context)=>{
     try {
        await connectDB();
        const session = await getServerSession(authOptions)
        if(!session){
         return NextResponse.json({error:"user not authorized"},{status:401})
        }
       const params = await context.params; 
        const usr = await  User.findOne({username:params?.username})
      //   .select('username profilePic name bio ')
        let isFollowing = false
   //      if(session){
   //    const follow = await Follow.findOne({followerId:session?.user?.id,followingId:user?._id})
      
   //    isFollowing = !! follow
   
   // }
         const [user] = await User.aggregate([
         {$match:{username:params?.username}},
         {
            $lookup:{
               from: "follows",
               localField:"_id",
               foreignField:"followingId",
               as:"followers"
            },


         },
        
         {
            $lookup:{
               from:"follows",
               localField:"_id",
               foreignField:"followerId",
               as:"following"
            }
         },
         {
            $lookup:{
               from:"posts",
               localField:"_id",
               foreignField:"user",
               as:"posts"
            }
         }
         ,
   {
  $lookup: {
    from: "users",
    localField: "followers.followerId",
    foreignField: "_id",
   //  let: { followerIds: "$followers.followerId" },
   //  pipeline: [
   //    {
   //      $match: {
   //        $expr: { $in: ["$_id", "$$followerIds"] }
   //      }
   //    },
   //    {
   //      $project: {
   //        username: 1,
   //        profilePic: 1   // 👈 only what you need
   //      }
   //    }
   //  ],
    as: "followersData"
  }
},

     
     {
      $addFields:{
         followersCount:{$size:"$followers"},
         followingCount:{$size:"$following"} ,
         totalPosts:{$size:"$posts"}
     }
   },{
      $project: {
    username: 1,
    profilePic: 1,
    followersCount: 1,
    followingCount: 1,
    "followersData.username": 1,
    "followersData.profilePic": 1,
    totalPosts:1,
    name:1,
      bio:1
  }
   }
      ])
   if(session){
      const follow = await Follow.findOne({followerId:session?.user?.id,followingId:user?._id})
      
      isFollowing = !! follow
   
   }
        return NextResponse.json({user,isFollowing},{status:200})
     } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500})
     }
}