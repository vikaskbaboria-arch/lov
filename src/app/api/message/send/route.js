import connectDB from "@/lib/connectDB";
import Conversation from "@/models/Conversation.model";
import Message from "@/models/Message.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
export const POST =async(req)=>{
    try {
        await connectDB();
        const session= getServerSession(authOptions)
      
        const {convId,text,senderId}= await req.json();
        // const conversation = await Conversation.findOneAndUpdate({members},
          if(!text){
            return NextResponse.json({error:"text is missing"},{status:403})
          }
        // )
        let conversation = await Conversation.findById(convId)
        if(!conversation){
              return NextResponse.json({error:"converastion does not exist"},{status:402})
        }
        const message =await Message.create({senderId:senderId,conversationId:convId,text:text})
        return NextResponse.json(message,{status:200})

    } catch (error) {
        console.error(error)
        return NextResponse.json({error},{status:500})
    }
}
