import { sendEmail } from "@/lib/mailer.js";
import { generateOtp } from "@/lib/generateOtp.js";
import User from "@/models/User.model.js" ;
import connectDB from "@/lib/connectDB";
import { NextResponse } from "next/server";
export async function POST(req) {
   try{
     await connectDB()
    const {email} = await req.json();
    
    const user = await User.findOne({email:email});
    
    if(user?.isVerified===true){
      return NextResponse.json({error:"User is already verified"},
      {status:403}
      )
    }
    //  if(Date.now()>user.otpexpiry){
    //             return NextResponse.json({error:"you cannot resend otp within 5 mins"},{status:402})
    //         }
     const otp = generateOtp();
    await User.updateOne({email},{otp,
        otpexpiry:Date.now() + 5*60*1000
    })
  
    await sendEmail(
        email,
         "Your OTP Code lov ",
       `Your OTP is ${otp}  `
    );

     return Response.json({
    message: "OTP sent",
    otp
  })
   }
   catch(error){
     console.log(error)
   }
}