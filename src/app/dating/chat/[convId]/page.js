import React from 'react'
import Chat from '@/components/messagecomp/chat'
import Inbox from '@/components/messagecomp/inbox'
import Providers from '@/components/providers.js'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const page = async ({params}) => {
      const session = await getServerSession(authOptions)
    const {convId} = await params
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/c/${convId}`,{
        method:'GET'
      })
      const data = await res.json()
  return (
       <div className="flex  h-[100vh] overflow-hidden  ">
      
      {/* LEFT - Inbox */}
      <div className="w-1/3 border-r overflow-y-auto ">
       <Inbox chats={data} />
      </div>

      {/* RIGHT - Chat */}
      <div className="w-2/3 overflow-y-auto ">

      {/* <Providers> {children}</Providers> */}
       <div className='text-white h-full'>
     <Providers><Chat convId ={convId }  members={data}/></Providers>
      
    </div>
      </div>

    </div>
  )
}

export default page