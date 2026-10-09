"use client"
import React, { useEffect, useState, useRef, useMemo } from 'react'
import SentMessage from './sentMessage';
import Link from 'next/link';
import getDateLabel from "@/helpers/getDateLabel"
import ChatSkeleton from '@/components/loading/chatSkelton';
import { useSession } from 'next-auth/react';
import { pusherClient } from "@/lib/pusherClient";
import { ArrowLeft } from "lucide-react";
const Chat = ({convId, members}) => {
  const [chat,setChat]= useState([]);
  const [loading,setLoading] = useState(true);
  const bottomRef = useRef(null);
  const {data:session,status} = useSession()
 
  
  const senderId = session?.user?.id
  const sortedChat = useMemo(() => {
    return [...chat].sort(
      (a, b) => new Date(a?.createdAt || 0) - new Date(b?.createdAt || 0)
    );
  }, [chat]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [sortedChat]);

  useEffect(()=>{
       const fetchMessage=async()=>{
         try {
    const res = await fetch(`/api/message/${convId}`);

    if (!res.ok) {
      throw new Error("Failed to fetch messages");
    }

    const data = await res.json();
     console.log(data)
    setChat(Array.isArray(data) ? data : []);
  } catch (error) {
    //console.log(error);
    setChat([]);
  } finally {
    setLoading(false);
  }
       }
       fetchMessage();
   
  },[convId])
   useEffect(() => {

  if (!convId) return;

  const channel = pusherClient.subscribe(
    `conversation-${convId}`
  );

  channel.bind("new-message", (message) => {

    setChat((prev) => {

      // prevent duplicate messages
      const exists = prev?.some(
        (m) => m?._id === message?._id
      );

      if (exists) return prev;

      return [...prev, message];
    });

  });

  return () => {

    channel.unbind_all();

    pusherClient.unsubscribe(
      `conversation-${convId}`
    );
  };

}, [convId]);
     
  if(status==="loading" || loading){
    return <ChatSkeleton/>
  }

  //console.log(chat)
 
const otherUser = Array.isArray(members)
  ? members.find((m) => m?._id !== senderId)
  : null;
let lastDate =""
  return (
 <div className="h-full  w-full flex flex-col bg-neutral-950 text-neutral-100">

      {/* 🔥 HEADER */}
      <div className="flex-shrink-0 justify-between px-4 py-3 flex items-center gap-3 border-b border-neutral-800">

 <Link href="/direct/inbox" aria-label="Back to conversations" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-neutral-300 transition hover:bg-neutral-800 md:hidden">
  <ArrowLeft className="h-5 w-5" />
 </Link>

 <div className='flex gap-4'>


       <Link href={`/${otherUser?.username}`} >
        <img
          src={otherUser?.profilePic || "/default.png"}
          alt=""
          className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-800"
        />
</Link>
        <div > 
          <Link href={`/${otherUser?.username}`} > <div className="text-sm font-semibold">
            {otherUser?.username || "Unknown User"}
          </div></Link>
         
          <div className={`text-xs ${otherUser?.isOnline ? "text-green-400" : "text-neutral-500"}`}>
          {otherUser?.isOnline ?"Online":`Last seen ${getDateLabel(otherUser?.lastSeen)}`}
          </div>
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

          {sortedChat
            .map((m, i) => {
           const isMine =
  m?.senderId?._id === senderId ||
  m?.senderId === senderId;
             const label = getDateLabel(m?.createdAt);

  const prevMessage = sortedChat[i - 1];

  const prevLabel = prevMessage
    ? getDateLabel(prevMessage.createdAt)
    : null;

  const showDate = prevLabel !== label;
            return (
              <div
                key={m._id}
                
              >
               
               {showDate && (
    <div className="flex justify-center my-4">
      <span className="  px-3 py-1 text-[11px] text-neutral-500">
        {label}
      </span>
    </div>
  )}

  <div
    className={`flex w-full ${
      isMine ? "justify-end" : "justify-start"
    }`}
  >   
 
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
                    {m.isread &&(
                      <span className={`ml-1 text-xs ${isMine ? "text-green-500" : "text-neutral-500"}`}>
                        ✅
                      </span>
                    )}
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
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>
        
      )}

      {/* 🔥 INPUT */}
      <div >
        <SentMessage convId={convId} senderId={senderId} setChat={setChat} />
      </div>
    
    </div>
  )
}

export default Chat 

// {members?.find(m=>m._id !== senderId)?.username || "Unknown User"}

//
