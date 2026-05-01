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
        {rchats?.map((post) => (
          <div key={post._id} className="bg-gray-300 h-32 rounded-lg" onClick={()=>(openBos(post))}>
            {post?.otherUser?.username}

          </div>
        ))}
    </>
  )
}
export default Inbox