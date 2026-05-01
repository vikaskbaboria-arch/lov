import Conversation from "@/models/Conversation.model";
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
import User from  "@/models/User.model.js"
export  const GET = async(req,{params})=>{
           try {
            await connectDB();
          
            const {userId} = await params
            console.log("userId")
            console.log(userId)
            if(!userId){
                return NextResponse.json({error:"User ID is required"},{status:403})
            }
              const user = await User.findById(userId)
              if(!user){
                return NextResponse.json({error:"User not found"},{status:401})
              } 
            const conversation = await Conversation.find({members:userId}).
            populate("members", "username profilePic   ")
      .sort({ createdAt: -1 })
      .lean();

    const formatted = conversation.map((conv) => {
  const otherUser = conv.members.find(
    (m) => m?._id.toString() !== userId
  )

  return {
    ...conv,
    otherUser
  }
})

      console.log(formatted)
      
            if(conversation.length === 0){
                return NextResponse.json({message:"You don't have any conversations yet"})
            }
            return NextResponse.json(formatted,{status:200})
           } catch (error) {
                 console.error(error)
                 return NextResponse.json({error:"Internal server error. Please try again"},{status:500})
           }
}