import Post from "@/models/post.model";
import connectDB from "@/lib/connectDB";

export async function GET(req, { params }) {

  try {

    await connectDB();

    const post = await Post.findById(params.id);

    if (!post?.photo) {
      return new Response("Image not found", {
        status: 404,
      });
    }

    const imageResponse = await fetch(post.photo);

    const imageBuffer =
      await imageResponse.arrayBuffer();

    return new Response(imageBuffer, {
      headers: {
        "Content-Type":
          imageResponse.headers.get(
            "content-type"
          ) || "image/jpeg",

        "Cache-Control":
          "public, max-age=31536000",
      },
    });

  } catch (error) {

    return new Response("Failed", {
      status: 500,
    });
  }
}