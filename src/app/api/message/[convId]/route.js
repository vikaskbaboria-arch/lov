import connectDB from "@/lib/connectDB";
import Conversation from "@/models/Conversation.model";
import Message from "@/models/Message.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export const GET = async(req,{params})=>{
    try {
        const session = getServerSession(authOptions)
        const sessionId = session?.user?.id
        await connectDB();
        const {convId} = await params;
        if(!convId){
            return NextResponse.json({error:"body is empty"},{status:403})
        }
        const isMessage = await Message.findOne({conversationId:convId})
        if(!isMessage){
            return NextResponse.json({error:"no messages are found"},{status:400})
        }
        const messages = await Message.find({conversationId:convId}).
        populate("senderId","username ").
       sort({ createdAt: 1 })
      .lean();
     
      
      return NextResponse.json(messages,{status:200})
    } catch (error) {
        console.error(error)
        return NextResponse.json({error:"the error is 500"},{status:500})
    }
}