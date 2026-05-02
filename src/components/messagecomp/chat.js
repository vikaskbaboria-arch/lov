"use client"
import React, { useEffect, useState ,useRef} from 'react'
import SentMessage from './sentMessage';

import { useSession } from 'next-auth/react';
const Chat = ({convId, members}) => {
  const [chat,setChat]= useState([]);
  const [otherUser,setOtherUser] = useState();
  const {data:session,status} = useSession()
   const bottomRef = useRef(null);

  // 🔥 auto scroll to latest message
 
  
  const senderId = session?.user?.id
  useEffect(()=>{
       const fetchMessage=async()=>{
        const res = await fetch(`/api/message/${convId}`,{
          method:'GET',
          headers:{
            'content-type':'application/json'
          }
        })
        const data = await res.json();
      
setChat(Array.isArray(data) ? data : []);
       }
       fetchMessage();
   
  },[convId])
   
     
  // 🔥 auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
   if(status==="loading"){
    return <div>loading...</div>
  }

  console.log(chat)
 

  return (
<div className="h-full w-full flex flex-col bg-[#0a0519] ">

      {/* 🔥 Header */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-3 bg-[#140a25] border-b border-pink-500/20">
        <div className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500">
          💜
        </div>

        <div>
          <div className="text-white text-sm font-semibold">
            {members?.find(m=>m._id !== senderId)?.username || "Unknown User"}
          </div>
          <div className="text-cyan-400 text-xs">
            ● online now
          </div>
        </div>

        <div className="ml-auto text-xs text-white/40">
          99% compat.
        </div>
      </div>

      {/* 🔥 Messages */}
    { 
    (chat.length === 0) ? (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        No messages yet. Say hi! 👋
      </div>
    ) : (

    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2 no-scrollbar">
        {chat?.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m?.senderId?._id === senderId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 text-sm text-white rounded-xl ${
                m?.senderId?._id === senderId
                  ? "bg-gradient-to-br from-pink-500 to-purple-500"
                  : "bg-white/10 border border-white/10"
              }`}
            >
              <div>{m.text}</div>
              <div className="text-[10px] text-white/50 text-right mt-1">
                {m.time}
              </div>
            </div>
          </div>
        ))}

        {/* 👇 scroll anchor */}
        <div ref={bottomRef} />
      </div>)}

      {/* 🔥 Input */}
      <div className="flex-shrink-0 border-t border-white/10 p-3 bg-[#0a0519]">
        <SentMessage convId={convId} senderId={senderId} />
      </div>
    </div>
  )
}

export default Chat