"use client"

import { useEffect, useState } from "react";
import HomeSkeleton from "@/components/loading/HomeSkelton";
import CreateNgl from "@/components/nglComp/createNgl";
import SidePanel from "@/components/home/sidePane"
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

//console.log("Posts in Home component:", posts)

if (status === "loading") {
  return (
  <Loading/>
  );
}
if(!session){
    return <LandingPage/>
}
if(loading === true){
  return <HomeSkeleton/>
}
  return (

    <>
 
<div className="bg-neutral-950 min-h-screen">
    <div className="mx-auto flex max-w-6xl gap-4 px-4 sm:gap-6 sm:px-6">
    <div className="flex-1 flex flex-col gap-6 max-w-xl mx-auto">
      <UserSuggest />

      {posts?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  </div>

  {/* RIGHT SIDEBAR (STICKED TO SCREEN RIGHT) */}
  <div className="fixed right-6 top-[70px] hidden w-[300px] xl:block">
    <SidePanel />
  </div>

  {/* FLOATING BUTTON */}
  {openCreatePost ? (
    <CreatePost setOpen={setOpenCreatePost} />
  ) : (
    <button
      onClick={() => setOpenCreatePost(true)}
      className="fixed bottom-24 right-4 z-40 rounded-full bg-rose-500 px-5 py-3 text-2xl text-white shadow-lg transition hover:bg-rose-400 sm:right-6 md:bottom-8 md:right-8"
    >
      +
    </button>
  )}
</div>
  </>
  );
}

