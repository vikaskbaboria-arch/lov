import Ngl from "@/models/ngl.model.js";
import connectDB from "@/lib/connectDB.js";
import Post from "@/models/post.model.js"
import User from "@/models/User.model.js"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import mongoose from "mongoose"
export const POST = async(req)=>{
    try{
        await connectDB();
        const {text,isAnnonymous} = await req.json();
        const session = await getServerSession(authOptions);
        const userObjectId = new mongoose.Types.ObjectId(session?.user?.id);
        if(!session || !session?.user || !session?.user?.email){
            return NextResponse.json({error:"Not authenticated"},{status:401})
        }
        const user = await User.findOne({_id:userObjectId});
        if(!user){
            return NextResponse.json({error:"User account not found"},{status:401})
        }
        const ngl = await Ngl.create({text,author:user._id,isAnnonymous:isAnnonymous || false})
        return NextResponse.json({ngl},{status:200})
    }
    catch(error){
        return NextResponse.json({error:"Server error"},{status:500})
    }
}
export const GET = async()=>{
    try {
        await connectDB();
        const ngl = await Ngl.find().
        populate('author','username profilePic').
        sort({createdAt:-1}).
        lean()
    
       return NextResponse.json(ngl)
    } catch (error) {
        return NextResponse.json({error:"server error"},{status:500})
    }
}