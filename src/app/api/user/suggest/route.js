import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import Follow from "@/models/follower.model.js";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
export const GET = async(req)=>{
      try{
         const session = await getServerSession(authOptions);
         if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})

         }
        await connectDB();
        const currentUser = await User.findOne({email:session?.user?.email})
        if(!currentUser){
            return NextResponse.json({error:"User account not found"},{status:401})
        }
        // Find users that the current user is not following and is not the current user
const user = await User.aggregate([
  {
    $match:{
      _id:{
        $ne: currentUser._id
      }
    }
  },
  {


    $lookup: {
      from: "follows",

      let: {
        userId: "$_id",
      },

      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                {
                  $eq: [
                    "$followingId",
                    "$$userId",
                  ],
                },

                {
                  $eq: [
                    "$followerId",
                    new mongoose.Types.ObjectId(
                      currentUser._id
                    ),
                  ],
                },
              ],
            },
          },
        },
      ],

      as: "followRelation",
    },
  },

  {
    $addFields: {
      isFollowing: {
        $gt: [
          {
            $size:
              "$followRelation",
          },
          0,
        ],
      },
    },
  },
{
  $limit: 10
},
  {
    $project: {
      username: 1,
      profilePic: 1,
      name: 1,
      isFollowing: 1,
    },
  },
])

;
   
        
        return NextResponse.json({ user },{status:200});
      }
      catch(error){
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500})
      }


}
