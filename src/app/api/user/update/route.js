import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const PUT = async(req)=>{
    try{
         
         const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"Not authenticated"},{status:401})
        }
        await connectDB();
        const {username,bio,profilePic,name}= await req.json();
        const user = await User.findOne({email:session.user.email})
        if(!user){
            return NextResponse.json({error:"User account not found"},{status:401})
        }
        
      
    const updateData = {};

    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;
    if (profilePic) updateData.profilePic = profilePic;
    if (name) updateData.name = name;
    const existingUserWithUsername = await User.findOne({ username, email: { $ne: session.user.email } });
    if (existingUserWithUsername) {
        return NextResponse.json({ error: "Username already exists" }, { status: 400 });
    }
    
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      updateData,
      { new: true }
    );
         return NextResponse.json({user:updatedUser},{status:200})
    
    }
    catch(error){
        console.error(error);
        return NextResponse.json({error:"Server error"},{status:500})
    }
}