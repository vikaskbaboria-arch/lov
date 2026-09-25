"use client";

import { useEffect, useState } from "react";

import FollowButton from "../followButton";
export default function UserSuggest() {
  const [followed, setFollowed] = useState({});
  const[loading,setLoading] = useState(true);
  const [users,setUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

useEffect(()=>{
  const fetchUsers = async()=>{
    const res = await fetch('/api/user/suggest',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userData = await res.json();
    //console.log("userData in p",userData)
    setUsers(userData.user);
    console.log("users in suggest",userData.user);
    setLoading(false);
  };
  fetchUsers();
},[]);
if(loading){
  return   <section className="mx-auto w-full max-w-xl">
  {/* HEADER */}
  <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
    <div className="w-32 h-3 rounded bg-neutral-900 animate-pulse" />

    <div className="w-14 h-3 rounded bg-neutral-900 animate-pulse" />
  </div>

  {/* USERS */}
  <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto border-b border-neutral-900">
    
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="relative flex-none w-[140px] bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2.5"
      >
        {/* ONLINE DOT */}
        <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-neutral-800 animate-pulse" />

        {/* AVATAR */}
        <div className="w-11 h-11 rounded-full bg-neutral-900 animate-pulse" />

        {/* INFO */}
        <div className="space-y-2">
          <div className="w-20 h-3 rounded bg-neutral-900 animate-pulse" />

          <div className="w-14 h-2 rounded bg-neutral-900 animate-pulse" />
        </div>

        {/* BUTTON */}
        <div className="w-full h-8 rounded-md bg-neutral-900 animate-pulse mt-1" />
      </div>
    ))}
  </div>
</section>
}
  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
        <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
          People you may know
        </span>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-[11px] text-neutral-400 hover:text-white transition-colors duration-150 flex items-center gap-1"
        >
          {isOpen ? "^" : "v"}
        </button>
      </div>

      {isOpen && (
        <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto border-b border-neutral-900">
        {users?.map((u) => (
          <div
            key={u._id}
            className="relative flex-none w-[140px] bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2.5 hover:border-neutral-600 hover:bg-neutral-900 hover:-translate-y-px transition-all duration-150 cursor-pointer"
          >
            {/* Online dot */}
            {u?.isOnline && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
            )}

            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xl">
             <img  src={u?.profilePic} className="w-full h-full rounded-full" alt="" />
            </div>

            {/* Info */}
            <div>
              <p className="text-[13px] font-medium text-white leading-tight">
                {u.username}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {u?.meta}
              </p>
            </div>

            {/* Follow button */}
        
          <FollowButton userId={u._id} isFollowingInitial={u?.isFollowing} styles={'w-26 h-[26px] text-[11px] rounded-md'} />
         
          </div>
        ))}
        </div>
      )}
    </section>
  );
}