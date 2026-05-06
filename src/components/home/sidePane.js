"use client";

import { useState } from "react";

const suggestedUsers = [
  { id: 1, name: "Leila Hassan", handle: "leila.h", sub: "Suggested for you", emoji: "🍵" },
  { id: 2, name: "Dev Patel", handle: "devbuilds", sub: "Followed by priya.sharma", emoji: "📐" },
  { id: 3, name: "Zara Okafor", handle: "zara.ok", sub: "Suggested for you", emoji: "🌙" },
  { id: 4, name: "Camille Droit", handle: "camille.d", sub: "Followed by jake", emoji: "🎭" },
  { id: 5, name: "Sam Park", handle: "samparknyc", sub: "Suggested for you", emoji: "🎵" },
];

export default function SidePanel() {
  const [followed, setFollowed] = useState(new Set([4]));

  const toggle = (id) => {
    setFollowed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="sticky top-[52px] p-5 pt-6">

      {/* Me */}
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-neutral-900">
        <div className="w-11 h-11 shrink-0 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-lg">
          👤
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-medium text-white">
            Jordan Rivera
          </p>
          <p className="text-[12px] text-neutral-500">
            @jordan.r
          </p>
        </div>

        <button className="text-[12px] font-medium text-neutral-400 hover:text-white transition-colors duration-150">
          Switch
        </button>
      </div>

      {/* Suggested */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-medium text-neutral-500">
          Suggested for you
        </span>
        <button className="text-[11px] text-neutral-400 hover:text-white transition-colors duration-150">
          See all
        </button>
      </div>

      <div className="flex flex-col">
        {suggestedUsers.map((u) => (
          <div
            key={u.id}
            className="flex items-center gap-2.5 py-2 group"
          >
            <div className="w-9 h-9 shrink-0 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-base group-hover:border-neutral-600 transition-colors duration-150">
              {u.emoji}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-neutral-200 truncate">
                {u.name}
              </p>
              <p className="text-[11px] text-neutral-600 truncate">
                {u.sub}
              </p>
            </div>

            <button
              onClick={() => toggle(u.id)}
              className={`shrink-0 text-[12px] font-medium px-2.5 py-1 rounded-md border transition-colors duration-150 ${
                followed.has(u.id)
                  ? "border-neutral-800 text-neutral-600"
                  : "border-neutral-700 text-neutral-400 hover:border-neutral-400 hover:text-white"
              }`}
            >
              {followed.has(u.id) ? "Following" : "Follow"}
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 text-[11px] text-neutral-700 leading-loose">
        <div className="flex flex-wrap gap-x-2">
          <span className="hover:text-neutral-500 cursor-pointer">About</span>
          <span className="hover:text-neutral-500 cursor-pointer">Privacy</span>
          <span className="hover:text-neutral-500 cursor-pointer">Terms</span>
          <span className="hover:text-neutral-500 cursor-pointer">Help</span>
          <span className="hover:text-neutral-500 cursor-pointer">Advertising</span>
          <span className="hover:text-neutral-500 cursor-pointer">API</span>
          <span className="hover:text-neutral-500 cursor-pointer">Jobs</span>
        </div>

        <p className="mt-2">© 2025 Thread Inc.</p>
      </div>
    </div>
  );
}