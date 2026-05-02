"use client"
import React, { useEffect } from 'react'
import EditProfile from './editProfile.js'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ProfileSkeleton from './loading/profielSkelton.js'
import FollowButton from "@/components/followButton.js";
import { useRouter } from "next/navigation";
import StartmessageButton from './messagecomp/startmessageButton.js'
const Profile = (userName) => {
  console.log(userName.username);
 
const { data: session ,update,status} = useSession();  
const[isFollowing,setIsFollowing]= useState(false)
const [edit,setEdit] = useState(false)
const[posts,setPosts] = useState([]);
const [loading,setLoading] = useState(true)
const isAdmin = session?.user?.username === userName.username;


const [user,setUser] = useState({_id:"", username:"",bio:"",profilePic:"", })



// {write that handle change function which will upload the image to cloudinary and then update the user profile with new image url}
//the edit code is shifted to editProfile component


// this useEffect will fetch the user data from the server and set it to the state
const username = userName?.username;
useEffect(()=>{
   if (!username) return;
   
    const fetchData = async()=>{
      const res = await fetch(`/api/user/${username}`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
      
      })
      const data = await res.json();
      console.log(data)
      setUser(data?.user)
      setIsFollowing(data?.isFollowing)
      
    }
    fetchData();
},[username])
useEffect(()=>{
  if(!user?._id) return
    const fetchPosts = async()=>{

      const res = await fetch(`/api/post/${user?._id}`,{
        method:"GET",
        headers:{'Content-Type':'application/json'},
      })
      const data = await res.json();
      console.log(data)
      setPosts(data)
       setLoading(false)
    }
    fetchPosts();
   
},[user?._id])
if(loading===true){
  return (
    <ProfileSkeleton/>
  );
}
  return (
      <div className="min-h-screen bg-black py-6">
      {/* Header */}
     

         {/* this edit will show the edit modal */}


        {edit   && <EditProfile setEdit={setEdit}/>}
  




      {/* Profile Section */}
      <div className="max-w-4xl mx-auto  bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-6">
          <img
            src={user?.profilePic || 'https://via.placeholder.com/150'}
            alt="profile"
            className="w-28 h-28 rounded-full border"
          />

          <div>
            <h2 className="text-black text-2xl font-bold">{user?.username}</h2>
            <p className="text-gray-500">{user?.name}</p>
              {isAdmin && (
          <button className=" text-slate-200  px-0.5 bg-gray-600   rounded-lg  " onClick={()=>setEdit(!edit)}>
            Edit Profile
          </button>
        )} 
        {
         !isAdmin && <FollowButton userId ={user?._id} isFollowingInitial ={isFollowing} />
        }
        {
         !isAdmin && <StartmessageButton recipientId={user?._id} />
        }
            <div className="flex gap-6 mt-3 text-black">
              <div>
                <span className="font-semibold">{user?.totalPosts || 0}</span> Posts
              </div>
              <div>
                <span className="font-semibold">{user?.followersCount || 0}</span> Followers
              </div>
              <div>
                <span className="font-semibold">{user?.followingCount || 0}</span> Following
              </div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <p className="text-black">
            {user?.bio || "No bio available."}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="flex justify-around bg-white p-3 rounded-xl shadow">
          <button className="font-semibold">Posts</button>
          <button className="text-gray-500">Saved</button>
          <button className="text-gray-500">Tagged</button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto mt-4 grid grid-cols-3 gap-3 p-2">
        {posts?.map((post) => (
          <div key={post._id} className="bg-gray-300 h-32 rounded-lg">
            <img src={post.photo} alt="post" className="w-full h-full object-cover rounded-lg" />

          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Profile