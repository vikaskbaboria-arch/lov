import cloudinary from "@/lib/cloudinary.js";
import { NextResponse } from "next/server";
import streamifier from "streamifier";

const uploadPhoto = async (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "photos",
        resource_type: "image",
        format: "jpg",
        quality: "auto",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const files = formData.getAll("images");

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "No images found. Use a field named 'images' for multiple files." },
        { status: 400 }
      );
    }

    const uploads = await Promise.all(
      files.map(async (file) => {
        if (!file || typeof file.arrayBuffer !== "function") {
          throw new Error("Invalid file input");
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await uploadPhoto(buffer);

        return {
          public_id: result.public_id,
          url: result.secure_url,
          width: result.width,
          height: result.height,
          format: result.format,
        };
      })
    );

    return NextResponse.json(
      {
        success: true,
        photos: uploads,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to upload photos" },
      { status: 500 }
    );
  }
};
