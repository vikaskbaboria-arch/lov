"use client";
import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="h-full w-full flex flex-col bg-neutral-950 text-neutral-100 animate-pulse">

      {/* HEADER */}
      <div className="px-4 py-3 flex items-center gap-3 border-b border-neutral-800">
        <div className="w-9 h-9 rounded-full bg-neutral-800"></div>

        <div className="flex flex-col gap-1">
          <div className="h-3 w-24 bg-neutral-800 rounded"></div>
          <div className="h-2 w-16 bg-neutral-800 rounded"></div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3">

        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`flex w-full ${
              i % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-[70%] h-10 rounded-2xl ${
                i % 2 === 0
                  ? "bg-neutral-800"
                  : "bg-neutral-700"
              }`}
            ></div>
          </div>
        ))}

      </div>

      {/* INPUT */}
      <div className="p-3 border-t border-neutral-800">
        <div className="h-10 w-full bg-neutral-800 rounded-full"></div>
      </div>

    </div>
  );
};

export default ChatSkeleton;