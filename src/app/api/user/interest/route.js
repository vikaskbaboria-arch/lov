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
   
         const user = await User.findOne({_id:session?.user?.id}).
        select("interests").
        lean();
        const interests = user?.interests || [];

   
        return NextResponse.json({interests},{status:200})
     } catch (error) {
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500})
     }
}