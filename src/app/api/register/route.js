import User from "@/models/User.model.js"
import connectDB from "@/lib/connectDB.js"
import { NextResponse } from "next/server";
export const POST = async(req)=>{
    try {
        await connectDB();
        const {username,email,password}= await req.json();
        if(!username|| !email|| !password){
          return  NextResponse.json({error:"lastmessage"},{status:400})
        }
        const existingUser= await User.findOne({email:email});
        if(existingUser){
           return NextResponse.json({error:"User allready exists"},{status:400},)
        }
        await User.create({username:username,email:email,password:password})
        return NextResponse.json({message:"user created "},{status:200})
    } catch (error) {
        console.error(error.message)
        return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
    )
    }
}