import cloudinary from "@/lib/cloudinary.js";
import { NextResponse } from "next/server";
import streamifier from "streamifier";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { error: "No image found" },
        { status: 400 }
      );
    }

    // file -> buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload buffer directly to cloudinary
    const response = await new Promise((resolve, reject) => {

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "post",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      streamifier.createReadStream(buffer).pipe(stream);
    });

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};