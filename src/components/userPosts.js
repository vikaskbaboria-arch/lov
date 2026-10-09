"use client";
import React, { useState } from "react";
import  Image  from 'next/image';
import PostModal from "./PostModal";

const UserPosts = ({ posts = [], isAdmin , type}) => {
  const [selectedPost, setSelectedPost] = useState(null);
  //console.log("UserPosts received posts:", posts);
  const filteredPosts = type === "annonymous" ? posts.filter(post => post.isAnonymous) : posts.filter(post => !post.isAnonymous);
  return (
    <>
      {/* 🔹 Grid */}
      <div className="mx-auto mt-4 grid max-w-5xl grid-cols-3 gap-1 p-1 sm:gap-3 sm:p-2">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-md sm:rounded-xl"
            onClick={() => setSelectedPost(post)}
          >
            <img
              src={post.photo}
              alt="post"
              width={300}
              height={300}
              loading="lazy"
              className="h-full w-full object-cover"
            />

            {/* 🔹 Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm">
              ❤️ {post.totalLikes || 0}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </>
  );
};

export default UserPosts;
