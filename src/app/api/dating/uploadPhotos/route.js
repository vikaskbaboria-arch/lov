import connectDB from "@/lib/connectDB";
import User from "@/models/User.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";

export const PUT = async (req) => {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const photos = Array.isArray(body?.photos) ? body.photos : [];

    if (photos.length === 0) {
      return NextResponse.json(
        { error: "Please provide up to 5 photo URLs." },
        { status: 400 }
      );
    }

    if (photos.length > 5) {
      return NextResponse.json(
        { error: "You can only save up to 5 photos." },
        { status: 400 }
      );
    }

    const sanitizedPhotos = photos
      .map((photo) => (typeof photo === "string" ? photo.trim() : ""))
      .filter(Boolean)
      .slice(0, 5);

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { photos: sanitizedPhotos},
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, user },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Failed to update photos" },
      { status: 500 }
    );
  }
};
