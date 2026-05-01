import cloudinary from "@/lib/cloudinary.js";
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import User from "@/models/User.model"
import connectDB from "@/lib/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";
export const POST = async (req) => {
  try {
     await connectDB();
    //  const session = await getServerSession(authOptions);
    //  if(!session ){
    //   return NextResponse({error:"user not authorized"},{status:401})
    //  }
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { error: "No image found" },
        { status: 400 }
      );
    }

    // File -> Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // create temp uploads folder
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // create unique local path
    const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);

    // save file locally
    await fs.writeFile(filePath, buffer);

    // upload local path to cloudinary
    const response = await cloudinary.uploader.upload(filePath, {
      folder: "profile",
      use_filename: true,
      format: "jpg",
    });
    const updateUser =  await User.findOneAndUpdate({email:"vikaskbaboria@gmail.com"},{profilePic:response.secure_url})
    // delete local temp file
    await fs.unlink(filePath);
     
    return NextResponse.json(
      {
        success: true,
        data: updateUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};