"use client "
import React from 'react'
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useSession } from 'next-auth/react'
const Like = ({postId}) => {
  const {data:session} =  useSession();
  const handleLike = async()=>{
    const res = await fetch('/api/like/',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({postId:postId})
    })
    const data = await res.json()
    console.log(data)
  }
  return (
 

      <button onClick={handleLike}>
  <Heart size={18} />
      </button>

  )
}

export default Like