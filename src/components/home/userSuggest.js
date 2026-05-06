"use client";

import { useEffect, useState } from "react";

const matchUsers = [
  { id: 1, name: "Priya S.", meta: "NYU · 94% match", online: true, emoji: "🌿" },
  { id: 2, name: "Sofia R.", meta: "Columbia · 89%", online: true, emoji: "☁️" },
  { id: 3, name: "Marcus W.", meta: "Brooklyn · 81%", online: false, emoji: "🎸" },
  { id: 4, name: "Leila H.", meta: "Parsons · 78%", online: true, emoji: "🍵" },
  { id: 5, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
    { id: 6, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
      { id: 7, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
        { id: 8, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
          { id: 9, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
            { id: 10, name: "Dev P.", meta: "NYU · 75%", online: false, emoji: "📐" },
];


export default function UserSuggest() {
  const [followed, setFollowed] = useState(new Set());
const [users,setUsers] = useState([]);
  const toggle = (id) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
useEffect(()=>{
  const fetchUsers = async()=>{
    const res = await fetch('/api/user/suggest',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const userData = await res.json();
    console.log("userData in p",userData)
    setUsers(userData.users);
  };
  fetchUsers();
},[]);

  return (
    <section className="mx-auto w-full max-w-xl">
      <div className="flex items-center justify-between px-5 pt-4 pb-2.5">
        <span className="text-[11px] font-medium tracking-widest uppercase text-neutral-500">
          People you may know
        </span>
        <button className="text-[11px] text-neutral-400 hover:text-white transition-colors duration-150">
          Browse
        </button>
      </div>

      <div className="flex gap-2.5 px-5 pb-4 overflow-x-auto border-b border-neutral-900">
        {users?.map((u) => (
          <div
            key={u._id}
            className="relative flex-none w-[140px] bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex flex-col gap-2.5 hover:border-neutral-600 hover:bg-neutral-900 hover:-translate-y-px transition-all duration-150 cursor-pointer"
          >
            {/* Online dot */}
            {u?.online && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
            )}

            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-xl">
             <img  src={u?.profilePic} className="w-full h-full rounded-full" alt="" />
            </div>

            {/* Info */}
            <div>
              <p className="text-[13px] font-medium text-white leading-tight">
                {u.name}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                {u?.meta}
              </p>
            </div>

            {/* Follow button */}
            <button
              onClick={() => toggle(u.id)}
              className={`w-full py-1.5 rounded-md text-[11px] font-medium border transition-colors duration-150 ${
                followed.has(u.id)
                  ? "border-neutral-800 text-neutral-500"
                  : "border-neutral-700 text-neutral-300 hover:border-neutral-400 hover:text-white"
              }`}
            >
              {followed.has(u?.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}