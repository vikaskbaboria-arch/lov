"use client";
import React from "react";

const PostModal = ({ post, onClose }) => {
    console.log("Post data in modal:", post);
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 text-white w-[90%] max-w-4xl h-[80vh] rounded-xl flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 🔹 Left - Image */}
        <div className="w-1/2 bg-black flex items-center justify-center">
          <img
            src={post.photo}
            alt="post"
            className="object-contain max-h-full"
          />
        </div>

        {/* 🔹 Right - Content */}
        <div className="w-1/2 flex flex-col p-4">
          
          {/* User */}
          <div className="flex items-center gap-3 border-b border-gray-700 pb-3">
            <img
              src={post.user?.profilePic}
              className="w-10 h-10 rounded-full"
            />
            <p className="font-semibold">{post.user?.username}</p>
          </div>

          {/* Caption */}
          <div className="py-3 border-b border-gray-700">
            <p>
              <span className="font-semibold">
                {post.user?.username}
              </span>{" "}
              {post.caption}
            </p>
          </div>

          {/* Comments */}
          <div className="flex-1  overflow-y-auto py-3 space-y-2">
            {post.comments?.map((c) => (
              <p key={c._id} className="flex flex-row gap-3">   <img src={c.user?.profilePic} alt={c.user?.name} className="w-6 h-6 rounded-full" />
                <span className=" font-semibold ">
                 
                  {c.user?.name}
                </span>{" "}
                {c.text}
              </p>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-gray-700 pt-3">
            <p className="font-semibold mb-2">
                
              ❤️ {post.totalLikes || 0} likes
            </p>

            {/* Add comment */}
            <input
              placeholder="Add a comment..."
              className="w-full bg-transparent border border-gray-600 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;