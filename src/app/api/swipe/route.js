import connectDB from "@/lib/connectDB";
import User from "@/models/User.model.js";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
import { NextResponse } from "next/server";
import Swipe from "@/models/swipe.model.js"
export const GET = async(req)=>{
try {
    await connectDB();
    const session = await getServerSession(authOptions);
    const currentUserId = session?.user?.id
    const user = await User.find({_id:session?.user?.id})
    const alreadySwiped = await Swipe.find({fromUser:user?._id})
    const swipedUserIds = alreadySwiped.map(
        swipe=>swipe?.toUser
    )
    const swipes = await User.find({
    _id:{
    $nin:[
        ...swipedUserIds,
        currentUserId
    ]
    },
    isDatingEnabled:true,

    }).
    select('username profilePic photos name bio age interests')
    return NextResponse.json({swipes},{status:200})
 } catch (error) {
    console.error(error)
    return NextResponse.json({error:error.message},{status:500})
}
}