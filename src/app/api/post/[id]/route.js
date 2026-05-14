import connectDB from "@/lib/connectDB";
import Post from "@/models/post.model.js"
import User from "@/models/User.model.js"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }   
    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if(!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const {id} = await params;
    console.log("postId");
    console.log(id);
    
    const post = await Post.findById(id);
  if(post.user.toString() !== user._id.toString()) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }
   const po=  await Post.findByIdAndDelete(id);
   if(!po) {
    return NextResponse.json({ message: "Failed to delete post" }, { status: 500 });
   }
    return NextResponse.json({ message: "Post deleted successfully" }, { status: 200 });
  }
  catch(error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
}

}