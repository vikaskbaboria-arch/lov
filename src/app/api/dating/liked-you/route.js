import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
import Swipe from '@/models/swipe.model.js'

export const GET = async()=>{
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error:"not authorizes"},{status:401})
        }
        const user = await User.findOne({_id:session?.user?.id})
        if(!user){
            return NextResponse.json({error:"no user found"},{status:401})
        }
        const likes = await Swipe.find({
            toUser:session?.user?.id,
            action:'like'
        }).
        populate('fromUser','username name profilePic age bio')
        .sort({createdAt:-1})
        .lean()
        return NextResponse.json({likes},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
        }
}