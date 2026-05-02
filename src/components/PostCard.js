"use client";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useSession } from 'next-auth/react'
import Comment from "./post/comment";
import { useRouter } from "next/navigation";
import Like from "./post/like";
import { useState } from "react";
export default function PostCard({ post }) {
const [comment,setComment] = useState(false)
       const router = useRouter()
    const {data:session} =useSession();
    const handleClick = ()=>{
      router.push(`/${post?.user?.username}`)
    }
  if (post?.user?.username === session?.user?.username){
   return 
    }

  return (
    <div  style={{
          background: "rgba(10,5,25,0.9)",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: "14px", 
          backdropFilter: "blur(20px)",
        }} className=" rounded-2xl shadow-md  w-full max-w-xl mx-auto mb-4 ">
      
      {/* User Info */}
      <div className="flex p-4 items-center gap-3 mb-3" onClick={()=>handleClick()}>
        <img
          src={post?.user?.profilePic}
          alt="avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-sm">{post?.user?.username}</h3>
          <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Post Content */}
    

      {/* Post Image */}
     {post.photo && (
        <img
          src={post.photo} alt="" loading="lazy"
          style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "cover" }}
        />
      )}
        <p className="text-sm mt-3 mb-1 mx-4">{post.caption}</p>

      {/* Actions */}
      <div className="flex justify-between items-center text-gray-600 text-sm m-4">
        <span className="flex items-center gap-1 hover:text-red-500">
          <Like postId={post?._id} isLiked={post?.isLiked} />
        </span>

        <span className="flex items-center gap-1 hover:text-blue-500">
          <MessageCircle onClick={()=>setComment(!comment)} size={18} />
           {comment && <Comment postId={post?._id} comment={post?.comments}/> }
        </span>

        <button className="flex items-center gap-1 hover:text-green-500">
          <Share2 size={18} />
          Share
        </button>
      </div>
    </div>
  );
}