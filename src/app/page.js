"use client"

import { useEffect, useState } from "react";
import CreateNgl from "@/components/nglComp/createNgl";
import SidePanel from "@/components/home/sidePane"
import Navar from "@/components/navbar";
import Loading from "@/components/loading/loading.js";
import CreatePost from "@/components/createPost.js";
import PostCard from "@/components/PostCard.js";
import getPostData from "@/lib/getPostData.js";
import { useSession } from 'next-auth/react'
import LandingPage from "@/components/LandingPage";
import PostCar from "@/components/justMe.js";
import UserSuggest from "@/components/home/userSuggest";
export default function Home() {
 const {data:session,status} =useSession();
const [posts, setPosts] = useState([]);
const [openCreatePost, setOpenCreatePost] = useState(false);
const [loading, setLoading] = useState(true);
useEffect(() => {
  async function fetchPosts() {
    try{
      const postData = await getPostData();
      setPosts(postData);
      setLoading(false);
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
if(loading === true){
  return <Loading/>
}
  return (

    <>
 
<div className="bg-neutral-950 min-h-screen">
   <Navar />

    <div className="max-w-6xl mx-auto flex gap-6 px-4 pr-32">
    <div className="flex-1 flex flex-col gap-6 max-w-xl mx-auto">
      <UserSuggest />

      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  </div>

  {/* RIGHT SIDEBAR (STICKED TO SCREEN RIGHT) */}
  <div className="hidden lg:block fixed top-[70px] right-6 w-[300px]">
    <SidePanel />
  </div>

  {/* FLOATING BUTTON */}
  {openCreatePost ? (
    <CreatePost setOpen={setOpenCreatePost} />
  ) : (
    <button
      onClick={() => setOpenCreatePost(true)}
      className="fixed bottom-6 right-6 bg-white/10 text-2xl text-white px-5 py-3 rounded-full shadow-lg hover:bg-white/20 transition z-50"
    >
      +
    </button>
  )}
</div>
  </>
  );
}

