
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chat from '@/components/messagecomp/chat'
const Pah = async({params}) => {
  const session = await getServerSession(authOptions)
const {convId} = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/c/${convId}`,{
    method:'GET'
  })
  const data = await res.json()
    
  return (
    <div className="h-full min-h-0 text-white">
      <Chat convId={convId} members={data} />
    </div>
  )
}

export default Pah
