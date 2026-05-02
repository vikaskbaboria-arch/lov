"use client"
import { useState } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
const Inbox = ( {chats} ) => {
 const router = useRouter();
  console.log(chats)
   const [rchats,setChat]=useState([])
    useEffect(()=>{
      if (Array.isArray(chats)) {
    setChat(chats)
  }

    },[chats])
   console.log(rchats)
   const openBos = async(e)=>{
             const id = e?._id
             router.push(`/direct/inbox/${id}`)
   }
  return (
    <>
         <div className="">

      {rchats?.map((conv) => (
        <div
          key={conv._id} 
          onClick={() => openBos(conv)}
          className="flex items-center gap-3 p-3  cursor-pointer transition-all duration-200 border-b-1 border-b-purple-200 hover:bg-[#1c1c1c] active:scale-[0.98]"
        >
          
          {/* Avatar */}
          <div className="relative">
            <img
              src={conv?.otherUser?.profilePic || "/default.png"}
              alt="user"
              className="w-12 h-12 rounded-full object-cover"
            />

            {/* Online indicator */}
            {conv?.otherUser?.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
            )}
          </div>

          {/* User Info */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium truncate">
              {conv?.otherUser?.username}
            </h3>

            <p className="text-gray-400 text-sm truncate">
              {conv?.lastMessage || "Start a conversation..."}
            </p>
          </div>

          {/* Time */}
          <span className="text-xs text-gray-500">
            {conv?.updatedAt
              ? new Date(conv.updatedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </span>
        </div>
      ))}

      {/* Empty State */}
      {rchats?.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No conversations yet
        </div>
      )}
    </div>
    </>
  )
}
export default Inbox