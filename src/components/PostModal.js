"use client";
import React, { useState } from "react";
import  Image  from 'next/image';
import { useSession } from "next-auth/react";
import Comment from "./post/comment";
import PostDeleteButton from "./post/postDeleteButton";
const PostModal = ({ post, onClose }) => {
  const {data:session} = useSession();
  const isAdmin = session?.user?.id === post?.user?._id
    console.log("Post data in modal:", post);
    const [menu,setMenu] = useState(false)

  return (
    <>
  
  <div
  className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center px-4"
  onClick={onClose}
>
     {menu && (
      <div onClick={() => setmenu(false)} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
        <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 text-neutral-100 shadow-2xl">
          
          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-neutral-900 px-5 py-4">
            <h2 className="text-[15px] font-semibold">
              Post options
            </h2>

            <button onClick={() => setMenu(false)} className="rounded-md p-1 text-neutral-500 hover:bg-neutral-900 hover:text-white transition">
              ✕
            </button>
          </div>

          {/* OPTIONS */}
          <div className="p-2">

            {/* DELETE */}
            { isAdmin && (
              <div className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 hover:bg-red-500/10 transition">
                <span className="text-[18px]">🗑️</span>

                <span className="text-[14px] font-medium">
                  <PostDeleteButton id={post._id}/>
                </span>
              </div>
            )}

            {/* COPY */}
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-neutral-300 hover:bg-neutral-900 transition">
              <span className="text-[18px]">🔗</span>

              <span className="text-[14px] font-medium">
                Copy link
              </span>
            </button>

            {/* REPORT */}
            <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-neutral-300 hover:bg-neutral-900 transition">
              <span className="text-[18px]">🚩</span>

              <span className="text-[14px] font-medium">
                Report
              </span>
            </button>

          </div>
        </div>
      </div>
    )}
  <div
    onClick={(e) => e.stopPropagation()}
    className="w-full max-w-6xl h-[90vh] bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden flex text-neutral-100 shadow-2xl"
  >
    
    {/* LEFT IMAGE */}
    <div className="w-[58%] bg-neutral-950 flex items-center justify-center border-r border-neutral-800">
      <Image
        src={post.photo}
        alt="post"
        width={600}
        height={600}
        loading="lazy"
        className="w-full h-full object-contain"
      />
    </div>

    {/* RIGHT PANEL */}
    <div className="w-[42%] flex flex-col bg-neutral-950">

      {/* HEADER */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-900">
        <Image
          src={post.user?.profilePic}
          alt={post.user?.username}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover border border-neutral-800"
        />

        <div className="flex-1">
          <p className="text-[14px] font-medium text-neutral-100">
            {post.user?.username}
          </p>

          <p className="text-[12px] text-neutral-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <button onClick={()=>setMenu(!menu)} className="text-neutral-500 hover:text-white transition">
          ···
        </button>
      </div>

      {/* CAPTION */}
      <div className="px-5 py-4 border-b border-neutral-900">
        <div className="flex gap-3">
          <Image
            src={post.user?.profilePic}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />

          <p className="text-[14px] leading-6 text-neutral-300">
            <span className="font-semibold text-white mr-1">
              {post.user?.username}
            </span>
            {post.caption}
          </p>
        </div>
      </div>

      {/* COMMENTS */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5 scrollbar-hide">
        {post.comments?.map((c) => (
          <div key={c._id} className="flex gap-3">
            <Image
              src={c.user?.profilePic}
              alt={c.user?.name}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />

            <div className="flex-1">
              <p className="text-[14px] text-neutral-300 leading-6">
                <span className="font-semibold text-white mr-1">
                  {c.user?.name}
                </span>
                {c.text}
              </p>

              <div className="flex items-center gap-4 mt-1 text-[12px] text-neutral-600">
                <span>Reply</span>
                <span>Like</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="border-t border-neutral-900 px-5 py-3">
        
        {/* ICONS */}
        <div className="flex items-center mb-3">
          <div className="flex items-center gap-4">
            
            <button className="hover:scale-110 transition">
              ❤️
            </button>

            <button className="hover:scale-110 transition">
              💬
            </button>

            <button className="hover:scale-110 transition">
              📤
            </button>
          </div>

          <button className="ml-auto hover:scale-110 transition">
            🔖
          </button>
        </div>

        {/* LIKES */}
        <p className="text-[14px] font-medium text-neutral-200 mb-3">
          {post.totalLikes || 0} likes
        </p>

        {/* COMMENT INPUT */}
     <Comment postId={post._id} />
      </div>
    </div>
  </div>
</div></>
  );
};

export default PostModal;