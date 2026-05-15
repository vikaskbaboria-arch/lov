"use client";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 animate-pulse">

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto p-6">

        <div className="flex items-center gap-6">
          
          {/* Profile Image */}
          <div className="w-[150px] h-[150px] rounded-full bg-neutral-800"></div>

          {/* User Info */}
          <div className="flex flex-col gap-3 w-full">
            
            {/* Username */}
            <div className="h-6 w-40 bg-neutral-800 rounded"></div>

            {/* Name */}
            <div className="h-4 w-32 bg-neutral-800 rounded"></div>

            {/* Stats */}
            <div className="flex gap-6 mt-2">
              <div className="h-4 w-16 bg-neutral-800 rounded"></div>
              <div className="h-4 w-20 bg-neutral-800 rounded"></div>
              <div className="h-4 w-20 bg-neutral-800 rounded"></div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-3">
              <div className="h-8 w-24 bg-neutral-800 rounded-md"></div>
              <div className="h-8 w-28 bg-neutral-800 rounded-md"></div>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-6 space-y-2">
          <div className="h-4 w-3/4 bg-neutral-800 rounded"></div>
          <div className="h-4 w-1/2 bg-neutral-800 rounded"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto border-b border-neutral-800">
        <div className="flex justify-around p-3">
          <div className="h-4 w-16 bg-neutral-800 rounded"></div>
          <div className="h-4 w-16 bg-neutral-800 rounded"></div>
          <div className="h-4 w-16 bg-neutral-800 rounded"></div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto mt-4 grid grid-cols-3 gap-3 p-2">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className="bg-neutral-800 h-32 rounded-lg"
          ></div>
        ))}
      </div>

    </div>
  );
};

export default ProfileSkeleton;