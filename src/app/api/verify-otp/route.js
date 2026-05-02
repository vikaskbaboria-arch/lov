import User from "@/models/User.model.js";
import connectDB from "@/lib/connectDB";

import { NextResponse } from "next/server";
export const POST =async(req)=>{
         try {
            await connectDB();
            const {email,otp}= await req.json();
            const user= await User.findOne({email:email});
           
            if(user.isVerified===true){
                return NextResponse.json({error:"This account is already verified"},{status:400})
            }
            if(otp!==user.otp){
                return NextResponse.json({error:"Invalid OTP code"},{status:401})
            }
            if(Date.now()>user.otpexpiry){
                return NextResponse.json({error:"OTP has expired. Please request a new one"},{status:402})
            }
            user.isVerified=true;
            user.otp=null;
            user.otpExpire=null;
            await user.save();
            return NextResponse.json({
              message:"Email verified"
             })
         } catch (error) {
            console.log(error);
            return NextResponse.json({error:"Database connection failed. Please try again"});
         }
}