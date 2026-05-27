import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
import Swipe from '@/models/swipe.model.js'
import Match from '@/models/Match.model.js'
export const GET = async()=>{
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        const currentUser = session?.user?.id
        console.log(currentUser)
        if(!session){
            return NextResponse.json({error:"not authorizes"},{status:401})
        }
        const user = await User.findOne({_id:session?.user?.id})
        if(!user){
            return NextResponse.json({error:"no user found"},{status:401})
        }

        const match = await Match.find({
          users:currentUser
        }).populate('users','username isOnline interests bio lastSeen  age gender profilePic')  
        console.log(match)   
      const matchesData =
   match.map((match)=>{

      const otherUser =
         match.users.find(

            (u)=>
               u._id.toString() !==
               currentUser.toString()
         );

      return {
         ...match.toObject(),
         user:otherUser
      };
   });
      //   console.log(matchesData)
        return NextResponse.json({matchesData},{status:200})
    } catch (error) {
        return NextResponse.json({error:error.message},{status:500})
        }
}
