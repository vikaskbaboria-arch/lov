import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Swipe from "@/models/swipe.model"
import Match from "@/models/Match.model.js"
export const POST=async(req)=>{
    try {
         await connectDB();
         const session = await getServerSession(authOptions)
         const fromUser = session?.user?.id
       const {toUser,}= await req.json();
       const  isFromUser = await  User.findById(fromUser)
       if(!isFromUser){
           return NextResponse.json({message:"no user is found "},{status:401})
       } 
         const  isToUser = await User.findById(toUser)
       if(!isToUser){
           return NextResponse.json({message:"no user is found "},{status:401})
       } 
       let isSwipeExist = await Swipe.findOne({fromUser:fromUser,toUser:toUser})
       if(isSwipeExist){
        return NextResponse.json({message:"swipe allready exist"},{status:404})
       }
       const swipe = await Swipe.create({
        fromUser:fromUser,toUser:toUser,action:"like"
       })
       const reverseSwipe =
       await Swipe.findOne({

      fromUser:toUser,

      toUser:currentUser._id,

      action:"like"
   });
if(reverseSwipe){

   const existingMatch =
      await Match.findOne({
         users:{
            $all:[
               session?.user?.id,
               toUser
            ]
         }
      });

   if(!existingMatch){

      const match =
         await Match.create({
            users:[
               currentUser._id,
               toUser
            ]
         });

      return NextResponse.json({
         matched:true,
         match
      });
   }
}
       return NextResponse.json({swipe},{status:200})
    } catch (error) {
       return NextResponse.json({error:"Server session error"},{status:500})
    }
}