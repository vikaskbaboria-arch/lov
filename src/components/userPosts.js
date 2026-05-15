"use client";
import React, { useState } from "react";
import  Image  from 'next/image';
import PostModal from "./PostModal";

const UserPosts = ({ posts = [], isAdmin , type}) => {
  const [selectedPost, setSelectedPost] = useState(null);
  console.log("UserPosts received posts:", posts);
  const filteredPosts = type === "annonymous" ? posts.filter(post => post.isAnonymous) : posts.filter(post => !post.isAnonymous);
  return (
    <>
      {/* 🔹 Grid */}
      <div className=" max-w-5xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  gap-3  p-2   ">
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            className="relative h-[300px] cursor-pointer group "
            onClick={() => setSelectedPost(post)}
          >
            <Image
              src={post.photo}
              alt="post"
              width={300}
              height={300}
              loading="lazy"
              className=" w-full h-full rounded-xl object-cover "
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