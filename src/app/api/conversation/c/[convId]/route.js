import Conversation from "@/models/Conversation.model";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import User from  "@/models/User.model.js"
export  const GET = async(req,{params})=>{
           try {
            
            await connectDB();
          
            const {convId} = await params
            console.log("convId")
            console.log(convId)
            if(!convId){
                return NextResponse.json({error:"Conversation ID is required"},{status:403})
            }
              const user = await Conversation.findById(convId)
              if(!user){
                return NextResponse.json({error:"Conversation not found"},{status:404})
              } 
            const conversation = await Conversation.findById(convId).
            populate("members", "username profilePic   ")
      .sort({ createdAt: -1 })
      .lean();
          
    


     
      
            
            return NextResponse.json(conversation?.members,{status:200})
           } catch (error) {
                 console.error(error)
                 return NextResponse.json({error:"Internal server error. Please try again"},{status:500})
           }
}