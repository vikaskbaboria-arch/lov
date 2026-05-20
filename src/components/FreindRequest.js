"use client"
import React from 'react'

const FreindRequest = ({senderId,receiverId}) => {
    const sendRequest=async()=>{
         await fetch('/api/friend-request/request',{
            method:'POST',
            body:JSON.stringify({senderId:senderId,receiverId:receiverId})
         })
    }
  return (
    <button className='bg-white/5 border-1 border-white/10 px-4 py-1.5 rounded-full text-sm font-medium transition  w-52' onClick={()=>{
        sendRequest()
    }}>
        Request
    </button>


  )
}

export default FreindRequest