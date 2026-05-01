"use client"

import { useEffect, useState } from "react";
import Navar from "@/components/navbar";
import Loading from "@/components/loading/loading.js";
import CreatePost from "@/components/createPost.js";
import PostCard from "@/components/PostCard.js";
import getPostData from "@/lib/getPostData.js";
import { useSession } from 'next-auth/react'
import LandingPage from "@/components/LandingPage";
export default function Home() {
 const {data:session,status} =useSession();
const [posts, setPosts] = useState([]);

useEffect(() => {
  async function fetchPosts() {
    try{
      const postData = await getPostData();
      setPosts(postData);
    }
    catch(error){
      console.error("Error fetching posts:", error);
    }
  }
  fetchPosts();
}, []);

console.log("Posts in Home component:", posts)

if (status === "loading") {
  return (
  <Loading/>
  );
}
if(!session){
    return <LandingPage/>
}
  return (
    <div className="bg-black pt-6">
 
     {/* <CreatePost/> */}
        <div className="flex max-w-6xl mx-auto  gap-6 px-4">
        
        {/* Left Sidebar */}
        <div className="hidden md:flex flex-col gap-4 w-1/4">
          <div className="bg-gray-800 p-4 rounded-xl">🏠 Home</div>
          <div className="bg-gray-800 p-4 rounded-xl">🔥 Explore</div>
          <div className="bg-gray-800 p-4 rounded-xl">💬 Messages</div>
          <div className="bg-gray-800 p-4 rounded-xl">👤 Profile</div>
        </div>

        {/* Feed (Main Content) */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Create Post */}
          <CreatePost/>
       
          {/* Posts */}
          {posts?.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 w-1/4">
          
          {/* Suggestions */}
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Suggestions</h3>
            {[1, 2, 3].map((user) => (
              <div key={user} className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
                  <p>user_{user}</p>
                </div>
                <button className="text-blue-400">Follow</button>
              </div>
            ))}
          </div>

          {/* Trends */}
          <div className="bg-gray-800 p-4 rounded-xl">
            <h3 className="font-semibold mb-3">Trends</h3>
            <p>#coding</p>
            <p>#webdev</p>
            <p>#startup</p>
          </div>
        </div>

      </div>
    </div>
  
  );
}

