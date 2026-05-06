import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
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
        const users = await User.find({
            _id: { $ne: currentUser._id },
            email: { $nin: currentUser.following }
        })
        .select("-password -email -followers -following -createdAt -updatedAt")
        ;
        return NextResponse.json({ users });
      }
      catch(error){
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500})
      }


}
