"use client"
import React, { useEffect } from 'react'
import EditProfile from './editProfile.js'
import PostDeleteButton from './post/postDeleteButton.js'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import ProfileSkeleton from './loading/profielSkelton.js'
import FollowButton from "@/components/followButton.js";
import Followers from "@/components/profile/Followers.js";
import Following from './profile/Following.js'
import StartmessageButton from './messagecomp/startmessageButton.js'
import UserPosts from './userPosts.js'
const Profile = (userName) => {
  console.log(userName.username);
 
const { data: session ,update,status} = useSession();  
const[isFollowing,setIsFollowing]= useState(false)
const [edit,setEdit] = useState(false)
const[posts,setPosts] = useState([]);
const[showFollowers,setShowFollowers] = useState(false);
const[showFollowing,setShowFollowing] = useState(false);
const [loading,setLoading] = useState(true)
const isAdmin = session?.user?.username === userName.username;
const[postType,setPostType] = useState("user")

const [user,setUser] = useState({_id:"", username:"",bio:"",profilePic:"", interests:[]})



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

      const res = await fetch(`/api/post/user/${user?._id}`,{
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
     <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-20">

  {/* EDIT MODAL */}
  {edit && <EditProfile setEdit={setEdit} />}

  {/* PROFILE SECTION */}
  <div className="max-w-5xl mx-auto px-6">

    <div className="relative">

      {/* Edit button */}
      {isAdmin && (
        <button
          onClick={() => setEdit(!edit)}
          className="absolute right-0 top-0 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-[11px] text-neutral-400 backdrop-blur transition-colors hover:border-neutral-700 hover:text-neutral-200"
        >
          Edit Profile
        </button>
      )}

      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:gap-10">

        {/* AVATAR */}
        <div className="relative shrink-0">
          <div className="rounded-full p-[2px] ring-1 ring-neutral-800">
            <img
              src={user?.profilePic || "https://via.placeholder.com/150"}
              alt="profile"
              className="h-32 w-32 rounded-full object-cover sm:h-40 sm:w-40"
            />
          </div>

          <span className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-950/80 px-2 py-0.5 text-[10px] text-neutral-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            active now
          </span>
        </div>

        {/* USER INFO */}
        <div className="flex-1 text-center sm:text-left">

          {/* Username */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">

            <h1 className="text-3xl font-semibold tracking-tight text-neutral-50 sm:text-4xl">
              {user?.username}
            </h1>

            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-neutral-900/60 px-2 py-0.5 text-[10px] text-neutral-300">
              🎓 verified
            </span>

            <span className="inline-flex items-center gap-1 rounded-full border border-neutral-800 bg-gradient-to-b from-neutral-900 to-neutral-950 px-2.5 py-0.5 text-[11px] font-medium text-neutral-100">
              💜 92% match
            </span>

          </div>

          {/* Name */}
          <p className="mt-1 text-sm text-neutral-500">
            {user?.name}
          </p>

          {/* BIO */}
          <p className="mt-4 max-w-xl whitespace-pre-line text-[15px] leading-relaxed text-neutral-200">
            {user?.bio || "No bio available."}
          </p>

          {/* TAGS */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">

      {user?.interests?.slice(0, 5).map((interest) => (
  <span
    key={interest}
    className="rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-1 text-xs text-neutral-300"
  >
    {interest}
  </span>
))}

          </div>

          {/* STATS */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:justify-start text-sm">

            <div className="text-neutral-400">
              <span className="font-semibold text-neutral-100">
                {user?.totalPosts || 0}
              </span>{" "}
              posts
            </div>

            <div
              onClick={() => setShowFollowers(!showFollowers)}
              className="cursor-pointer relative text-neutral-400 hover:text-neutral-200 transition"
            >
              <span className="font-semibold text-neutral-100">
                {user?.followersCount || 0}
              </span>{" "}
              followers

              {showFollowers && (
                <Followers
                  onClose={() => setShowFollowers(false)}
                  followers={user?.followersData}
                />
              )}
            </div>

            <div
              onClick={() => setShowFollowing(!showFollowing)}
              className="cursor-pointer relative text-neutral-400 hover:text-neutral-200 transition"
            >
              <span className="font-semibold text-neutral-100">
                {user?.followingCount || 0}
              </span>{" "}
              following

              {showFollowing && (
                <Following
                  onClose={() => setShowFollowing(false)}
                  following={user?.followingData}
                />
              )}
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="mt-6 flex flex-wrap justify-center gap-2 sm:justify-start">

            {!isAdmin && (
              <FollowButton
                userId={user?._id}
                isFollowingInitial={isFollowing}
              />
            )}

            {!isAdmin && (
              <StartmessageButton
                recipientId={user?._id}
              />
            )}

          </div>

        </div>
      </div>
    </div>
  </div>

  {/* TABS */}
  <div className="max-w-5xl mx-auto mt-10 border-b border-neutral-800">

    <div className="flex items-center justify-center gap-10 p-3 text-sm">

      <button 
        className={`
          ${postType === "user" ?  "border-b border-neutral-100" : ""}
           pb-3 font-medium text-neutral-100`}
        onClick={() => setPostType("user")}
      >
        Posts
      </button>

      <button className="pb-3 text-neutral-500 hover:text-neutral-300 transition">
        Saved
      </button>
{isAdmin &&
      <button className={`
        ${postType === "annonymous" ? "border-b border-neutral-100" : ""}
         pb-3 font-medium text-neutral-100
      `}  onClick={() => setPostType("annonymous")}>
        {
          isAdmin ? "Annonymus" : ""
        }
      </button>
}
    </div>
  </div>

  {/* POSTS */}
  <div className="mt-4">
    {posts.length > 0 ? (
      <UserPosts posts={posts} isAdmin={isAdmin}  type={postType}/>
    ) : (
      <div className="flex items-center justify-center py-20 text-neutral-500">
        No posts available.
      </div>
    )}
  </div>

</div>
  )
}

export default Profile