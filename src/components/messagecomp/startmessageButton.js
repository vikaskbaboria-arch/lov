"use client "
import { redirect } from "next/navigation";
import React from 'react'

const StartmessageButton = ({ recipientId }) => {


    const startMessage = async()=>{
     const res = await fetch('/api/conversation/',{ 
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({recipientId:recipientId})
     })
     const data = await res.json()
    if(res.ok){
        // redirect to the conversation page with the conversation id
        redirect(`/direct/inbox/${data.conversation._id}`)
    }

    }
  return (
    <button onClick={startMessage} className="bg-blue-500 text-white px-4 py-2 rounded-full">
Message
  </button>
  )
}

export default StartmessageButton