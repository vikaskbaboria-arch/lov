import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Follow from "@/models/follower.model.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (req)=>{
        try{
         await connectDB();
         const session  = await getServerSession(authOptions);
           if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
           } 
           const {id} = await req.json();
           const followerId = session?.user?.id;
           const alreadyFollowing = await Follow.findOne({followerId:followerId,followingId:id})
            if(alreadyFollowing){
                return NextResponse.json({error:"Already following"},{status:400})
            }
            const follow = await Follow.create({followerId:followerId,followingId:id})
         return NextResponse.json({follow},{status:200})
        }
        catch(error){
            console.error(error);
        }
}
export const DELETE = async (req)=>{
    try{
         await connectDB();
         const session  = await getServerSession(authOptions);
           if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
           } 
           const {id} = await req.json();
           const followerId = session?.user?.id;
        const alreadyFollowing = await Follow.deleteOne({
  followerId: new mongoose.Types.ObjectId(session.user.id),
  followingId: new mongoose.Types.ObjectId(id),
});
            if(!alreadyFollowing){
                return NextResponse.json({error:"not  following"},{status:400})
            }
          
         return NextResponse.json({alreadyFollowing},{status:200})
        }
        catch(error){
            console.error(error);
        }
}