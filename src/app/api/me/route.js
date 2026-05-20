import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";


export const GET = async (req)=>{
    try {
        
        await connectDB();
  
        const session = await getServerSession(authOptions);
        const currentUser = session?.user?.id
        if(!session?.user || !session || !session?.user?.id){
              return NextResponse.json({error:"user not authorized"},{status:401})
        }
        const user = await User.findById(currentUser)
        .select('username name profilePic isDatingEnabled  ')

   
        return NextResponse.json({user},{status:200})
    } catch (error) {
        return NextResponse.json({error:"server error"},{status:500})
    }
}