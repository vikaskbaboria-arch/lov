"use client";
import React from "react";

const InboxSkeleton = () => {
  return (
    <div className="animate-pulse">

      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-3 border-b border-neutral-800"
        >

          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-neutral-800"></div>

          {/* Text */}
          <div className="flex-1 space-y-2">
            <div className="h-4 w-32 bg-neutral-800 rounded"></div>
            <div className="h-3 w-48 bg-neutral-800 rounded"></div>
          </div>

          {/* Time */}
          <div className="h-3 w-10 bg-neutral-800 rounded"></div>

        </div>
      ))}

    </div>
  );
};

export default InboxSkeleton;