import connectDB from "@/lib/connectDB.js";
import Post from "@/models/post.model.js"
import User from "@/models/User.model.js"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose"

export const POST = async (req) => {
  try {await connectDB();
    const { caption, pic, isAnonymous } = await req.json();
    console.log('Backend received:',  isAnonymous );
    const session = await getServerSession(authOptions);
   
const userObjectId = new mongoose.Types.ObjectId(session?.user?.id);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    
    const user = await User.findOne({ _id: session?.user?.id });
    if (!user) {
      return NextResponse.json({ error: "User account not found" }, { status: 401 });
    }

    const post = await Post.create({ user: user._id, caption, photo: pic, isAnonymous: isAnonymous || false });
    console.log('Post created:', post);
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);

    await connectDB();
    const posts = await Post.aggregate([
      {  
        $match:{}
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

    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};