"use client";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useSession } from 'next-auth/react'
import { motion } from "framer-motion";
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
  <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="w-full max-w-xl mx-auto border-b border-neutral-900 px-5 py-4 text-white"
>

  {/* HEADER (from your article UI) */}
  <div className="flex items-center gap-2.5 mb-3 cursor-pointer" onClick={handleClick}>
    
    <img
      src={post?.user?.profilePic}
      alt="avatar"
      className="w-9 h-9 rounded-full object-cover border border-neutral-800"
    />

    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 text-[14px] font-medium">
        {post?.user?.username}
      </div>

      <div className="text-[12px] text-neutral-500">
        {new Date(post.createdAt).toLocaleDateString()}
      </div>
    </div>

    <button className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-900">
      ···
    </button>
  </div>

  {/* IMAGE */}
  {post.photo && (
    <div className="w-full aspect-square rounded-lg overflow-hidden border border-neutral-900 mb-3">
      <motion.img
        src={post.photo}
        alt=""
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className="w-full h-full object-cover"
      />
    </div>
  )}
 {/* CAPTION */}
  <div className="">
    {post.caption && (
    <p className="text-[14px] text-neutral-200 mb-1.5">
      {post.caption}
    </p>
  )}
  </div>

   <p className="text-[13px] text-neutral-500">
  <span className="text-neutral-300 font-medium">
    {post?.comments?.[0]?.user?.name}
  </span>{" "}
  {post?.comments?.[0]?.text}
</p>

   <div className=" border-t border-neutral-900"></div>
  {/* ACTIONS (your UI style + your logic) */}
  <div className="flex  items-center -mx-1.5   text-sm">
 
  
    {/* LIKE (your logic stays) */}
    <span className="flex items-center gap-2 px-2 mt-3 hover:bg-neutral-900 rounded-md transition">

      <Like postId={post?._id} isLiked={post?.isLiked} />
      <span className="text-neutral-300">
        {post?.totalLikes || 0}
      </span>
    </span>

    {/* COMMENT */}
    <span className="flex items-center gap-2 px-2 py-1.5 hover:bg-neutral-900 rounded-md transition">
      <motion.div whileTap={{ scale: 1.2 }}>
        <MessageCircle
          onClick={() => setComment(!comment)}
          size={16}
          className="cursor-pointer text-neutral-500 hover:text-neutral-300"
        />
      </motion.div>
    </span>

    {/* SHARE */}
    <button className="flex items-center gap-2 px-2 py-1.5 hover:bg-neutral-900 rounded-md text-neutral-500 hover:text-neutral-300 transition">
      <Share2 size={16} />
    </button>

    <div className="ml-auto"></div>

    {/* SAVE */}
    <button className="px-2 py-1.5 text-neutral-500 hover:text-neutral-300">
      🔖
    </button>
  </div>



  {/* COMMENTS PREVIEW */}
  {/* <p className="text-[13px] text-neutral-500">
    <span className="text-neutral-300 font-medium">
      {post?.comments?.[0]?.user}
    </span>{" "}
    {post?.comments?.[0]?.text}
  </p> */}

  {/* COMMENT SECTION */}
  {comment && (
    <div className="pt-3">
      <Comment postId={post?._id} comment={post?.comments} />
    </div>
  )}

</motion.div>
  );
}