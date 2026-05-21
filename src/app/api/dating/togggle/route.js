import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";


export const PATCH = async (req)=>{
    try {
        
        await connectDB();
        const {isDatingEnabled} = await req.json()
        const session = await getServerSession(authOptions);
        const currentUser = session?.user?.id
        if(!session?.user || !session || !session?.user?.id){
              return NextResponse.json({error:"user not authorized"},{status:401})
        }
        const user = await User.findById(currentUser)
        if(!user){

            return NextResponse.json({message:"no user found"},{status:401})
        }
        user.isDatingEnabled = isDatingEnabled
        await user.save();
   
        return NextResponse.json({isDatingEnabled:user.isDatingEnabled},{status:200})
    } catch (error) {
        return NextResponse.json({error:"server error"},{status:500})
    }
}