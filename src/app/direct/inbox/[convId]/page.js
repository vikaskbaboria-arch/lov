
import React from 'react'
import Providers from '@/components/providers.js'
import { getServerSession } from 'next-auth'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chat from '@/components/messagecomp/chat'
const Pah = async({params}) => {
  const session = await getServerSession(authOptions)
const {convId} = await params
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/${convId}`,{
    method:'GET'
  })
  const data = await res.json()
    
  return (
    <div className='text-white h-full'>
     <Providers><Chat convId ={convId }  members={data}/></Providers>
      
    </div>
  )
}

export default Pah