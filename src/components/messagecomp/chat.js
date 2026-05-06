"use client"
import React, { useEffect, useState ,useRef} from 'react'
import SentMessage from './sentMessage';
import getDateLabel from "@/helpers/getDateLabel"
import ChatSkeleton from '@/components/loading/chatSkelton';
import { useSession } from 'next-auth/react';
const Chat = ({convId, members}) => {
  const [chat,setChat]= useState([]);
  const [loading,setLoading] = useState(true);
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
setLoading(false);
       }
       fetchMessage();
   
  },[convId])
   
     
  // 🔥 auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);
   if(status==="loading" || loading){
    return <ChatSkeleton/>
  }

  console.log(chat)
 
 const otherUser = members.find(m=>m._id !== senderId)
let lastDate =""
  return (
 <div className="h-full w-full flex flex-col bg-neutral-950 text-neutral-100">

      {/* 🔥 HEADER */}
      <div className="flex-shrink-0 px-4 py-3 flex items-center gap-3 border-b border-neutral-800">

        <img
          src={otherUser?.profilePic || "/default.png"}
          alt=""
          className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-800"
        />

        <div>
          <div className="text-sm font-semibold">
            {otherUser?.username || "Unknown User"}
          </div>
          <div className="text-xs text-neutral-500">
            Active now
          </div>
        </div>

      </div>

      {/* 🔥 MESSAGES */}
      {chat.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          No messages yet. Say hi 👋
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2.5">

          {chat.map((m, i) => {
            const isMine = m?.senderId?._id === senderId;
             const label = getDateLabel(m.createdAt);

           const showDate = label !== lastDate;
           lastDate = label;
            return (
              <div
                key={i}
                className={`flex w-full ${
                  isMine ? "justify-end" : "justify-start"
                }`}
              >
               
                {/* Avatar (only for other user) */}
               {showDate && (
        <div className="w-full text-center text-xs mx-auto    text-neutral-500  ">
          {label}
        </div>
      )}      
 
                {/* Message Bubble */}
                <div
                  className={`group max-w-[75%] sm:max-w-[60%] rounded-2xl px-3.5 py-2 text-[15px] leading-relaxed ${
                    isMine
                      ? "bg-neutral-100 text-neutral-900 rounded-br-md"
                      : "bg-neutral-800 text-neutral-100 rounded-bl-md"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">
                    {m.text}
                  </p>

                  <div
                    className={`mt-1 flex items-center gap-1 text-[10px] ${
                      isMine
                        ? "text-neutral-500 justify-end"
                        : "text-neutral-500"
                    }`}
                  >
                    <span>  {new Date(m.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
      )}

      {/* 🔥 INPUT */}
      <div >
        <SentMessage convId={convId} senderId={senderId} />
      </div>
    
    </div>
  )
}

export default Chat 

// {members?.find(m=>m._id !== senderId)?.username || "Unknown User"}

//