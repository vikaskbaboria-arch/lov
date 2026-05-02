"use client "
import React from 'react'
import { useState } from 'react'
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useSession } from 'next-auth/react'
const Like = ({postId,isLiked
}) => {
  const {data:session} =  useSession();
  const [liked,setLiked] = useState(isLiked)
  const handleLike = async()=>{
    const res = await fetch('/api/like/',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({postId:postId})
    })
    const data = await res.json()
    if(res.ok){
      setLiked(!liked)
    }
    console.log(data)
  }
  
  return (
 

      <button onClick={handleLike}>
  <Heart size={18} fill={liked ? "red" : "none"} />
      </button>

  )
}

export default Like