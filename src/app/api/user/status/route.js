import connectDB from "@/lib/connectDB.js";
import User from "@/models/User.model.js";
import { pusherServer } from "@/lib/pusher.js";

export async function PATCH(req){



    try {
          await connectDB();

   const { userId, isOnline } = await req.json();
    
console.log(userId);
console.log(isOnline);
   const user = await User.findByIdAndUpdate(
      userId,
      {
         isOnline,
         lastSeen: new Date()
      },
      { new: true }
   );

   await pusherServer.trigger(
      "presence-channel",
      "status-update",
      {
         userId,
         isOnline,
         lastSeen: user.lastSeen
      }
   );

   return Response.json({
      success: true
   });
    } catch (error) {
        console.error(error);

    }
 

}