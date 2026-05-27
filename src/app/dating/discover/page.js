"use client"
import React from 'react'
import SwipeDeck from '@/components/swipe/SwipeCard';
import LikesYou from '@/components/swipe/LikesYou';
import { useSession } from 'next-auth/react';
import YouLiked from '@/components/swipe/YouLiked';
import MatchesPage from '@/components/swipe/matches';
import { useState } from 'react';
const Page = () => {
  const [activeTab,setActiveTab] = useState("discover");
  const {data:session} = useSession()
  const avatar =  "https://i.pravatar.cc/300?img=48";
  return (
    <div><button
onClick={()=>
setActiveTab("discover")
}>
   Discover
</button>

<button
onClick={()=>
setActiveTab("likes")
}>
   Likes You
</button>

<button
onClick={()=>
setActiveTab("liked")
}>
   You Liked
</button>

<button
onClick={()=>
setActiveTab("matches")
}>
   Matches
</button>



{
   activeTab === "likes"
   && <LikesYou />
}



{
   activeTab === "matches"
   && <MatchesPage />
}
{
   activeTab === "liked"
   && <YouLiked />
}
</div>
  )
}

export default Page