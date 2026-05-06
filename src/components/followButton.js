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
      className={`w-54 px-4 py-1.5 rounded-full text-sm font-medium transition 
        ${
          isFollowing
            ? "bg-white/5 text-white hover:bg-white hover:text-black border-1 border-white/10  backdrop-blur-md"
            : "bg-white text-black hover:bg-white/5 hover:text-white border-2 border-white "
        }
        ${loading && "opacity-50 cursor-not-allowed"}
      `}
    >
      {loading ? "..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;