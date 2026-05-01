"use client"
import React, { useState, useEffect } from 'react';

const FollowButton = ({ userId, isFollowingInitial }) => {
  const [isFollowing, setIsFollowing] = useState(isFollowingInitial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(isFollowingInitial);
  }, [isFollowingInitial]);

  const HandleFollow = async () => {
    try {
      setLoading(true);

      const res = await fetch('/api/follow', {
        method: isFollowing ? 'DELETE' : 'POST', // ✅ FIXED
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      });

      const data = await res.json();

      if (res.ok) {
        setIsFollowing(prev => !prev);
      } else {
        console.error(data.error);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={HandleFollow}
      disabled={loading}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition 
        ${
          isFollowing
            ? "bg-gray-200 text-black hover:bg-gray-300"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }
        ${loading && "opacity-50 cursor-not-allowed"}
      `}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;