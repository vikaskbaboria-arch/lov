"use client";
import React from "react";

const ProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-black py-6 animate-pulse">
      
      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-6">
          
          {/* Profile Image */}
          <div className="w-28 h-28 rounded-full bg-gray-300" />

          <div className="flex-1">
            {/* Username */}
            <div className="h-6 w-40 bg-gray-300 rounded mb-2" />

            {/* Name */}
            <div className="h-4 w-28 bg-gray-200 rounded mb-3" />

            {/* Button */}
            <div className="h-8 w-28 bg-gray-300 rounded-lg mb-4" />

            {/* Stats */}
            <div className="flex gap-6">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4 space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-4xl mx-auto mt-6">
        <div className="flex justify-around bg-white p-3 rounded-xl shadow">
          <div className="h-4 w-16 bg-gray-300 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-4xl mx-auto mt-4 grid grid-cols-3 gap-3 p-2">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="bg-gray-300 h-32 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProfileSkeleton;