import connectDB from "@/lib/connectDB.js";
import User from "@/models/User.model.js";
import { pusherServer } from "@/lib/pusher.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
export async function PATCH(req){



    try {
          await connectDB();
        const session = await getServerSession(authOptions);
        const userId = session?.user?.id
        const { longitude, latitude } = await req.json();
        if(!longitude || !latitude){
            return NextResponse.json({error:"longitude or latitude not provided"})
        }
        const city =""
        const state =""
        const country =""
    
//console.log(userId);
//console.log(isOnline);
   const user = await User.findByIdAndUpdate(
      userId,
      {
        coordinates:[
            longitude,
            latitude
        ],
        address:{
            city,
            state,
            country
        }
      },
      { new: true }
   );



   return Response.json({
      success: true
   });
    } catch (error) {
        console.error(error);

    }
 

}