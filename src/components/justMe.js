"use client";

import { useState } from "react";

export default function PostCar({ post }) {
  const [liked, setLiked] = useState(post.liked);
  const [saved, setSaved] = useState(post.saved);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [likeAnim, setLikeAnim] = useState(false);
  console.log("Rendering PostCar for post:", post);
  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    setLikeCount((c) => c + (next ? 1 : -1));

    if (next) {
      setLikeAnim(true);
      setTimeout(() => setLikeAnim(false), 300);
    }
  };

  return (
    <article className="border-b border-neutral-900 px-5 py-4">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-3">
        <div className="w-9 h-9 shrink-0 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-base hover:border-neutral-600 transition-colors duration-150 cursor-pointer">
          {post.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-white">
            {post.name}
            {post.verified && (
              <span className="w-3.5 h-3.5 bg-neutral-500 rounded-full flex items-center justify-center text-[7px] font-bold text-black">
                ✓
              </span>
            )}
          </div>

          <div className="text-[12px] text-neutral-500">
            @{post.handle} · {post.time} ago
          </div>
        </div>

        <button className="p-1.5 rounded-md text-neutral-600 hover:bg-neutral-900 hover:text-neutral-400 transition-colors duration-150 text-base leading-none">
          ···
        </button>
      </div>

      {/* Image */}
      <div className="w-full aspect-square rounded-lg bg-neutral-950 border border-neutral-900 flex items-center justify-center text-6xl mb-3 overflow-hidden">
        {post.imgEmoji}
      </div>

      {/* Actions */}
      <div className="flex items-center -mx-1.5 mb-2.5 border-b border-neutral-900 pb-2.5">

        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] font-medium transition-all ${
            liked
              ? "text-white"
              : "text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300"
          }`}
        >
          <span
            className={`text-base ${
              likeAnim ? "scale-125" : "scale-100"
            }`}
          >
            {liked ? "♥" : "♡"}
          </span>
          Like
        </button>

        {/* Comment */}
        <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300">
          💬 Comment
        </button>

        {/* Share */}
        <button className="flex items-center gap-1.5 px-2 py-1.5 rounded-md text-[12px] text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300">
          ↗ Share
        </button>

        <div className="ml-auto"></div>

        {/* Save */}
        <button
          onClick={() => setSaved((s) => !s)}
          className={`px-2 py-1.5 ${
            saved
              ? "text-neutral-300"
              : "text-neutral-600 hover:text-neutral-400"
          }`}
        >
          {saved ? "🔖" : "◻"}
        </button>
      </div>

      {/* Likes */}
      <p className="text-[13px] font-medium text-neutral-300 mb-1">
        {likeCount.toLocaleString()} likes
      </p>

      {/* Caption */}
      <p className="text-[14px] text-neutral-200 mb-1.5">
        {post?.caption}
      </p>

      {/* Tags */}
    

      {/* Comment */}
      <p className="text-[13px] text-neutral-500">
        <span className="text-neutral-300 font-medium">
          {post?.comment?.user}
        </span>{" "}
        {post?.comment?.text}
      </p>
    </article>
  );
}