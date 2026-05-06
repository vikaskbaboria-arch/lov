"use client"
import React from 'react'
import GlitchText from './ui/GlitchText'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react'
const Navar = () => {
    const router = useRouter();
    const {data:session,status} =useSession();
   const handleLink = ()=>{
    router.push(`/${session?.user?.username}`)
   }
  if(status==="loading"){
    return
  }
  return (
    <>
        <nav  className="sticky top-0 z-50 w-full mx-auto px-6 py-4 flex  items-center justify-between   
             text-white shadow-md bg-white/5 backdrop-blur-md">
      
      {/* Logo */}
      <div className="text-xl font-bold cursor-pointer" style={{  fontFamily: "'VT323', 'Courier New', monospace",}}>
        <Link  href="/"><GlitchText className='text-2xl' text="lov" /></Link>
      </div>

      {/* Search Bar */}
      {/* <div className="hidden md:block w-1/3">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> */}

      {/* Right Side */}
      <div className="flex items-center gap-5">
        
        {/* Home */}
   
    
   
        {/* Messages */}
        <button className="hover:text-blue-400 transition" >
        <Link href="/direct/inbox">
          Messages
        </Link>
        </button>

        {/* Notifications */}
        <button className="hover:text-blue-400 transition" onClick={()=>signOut()}>
          Logout
        </button>

        {/* Profile */}
        <div className="rounded-full bg-gray-700 cursor-pointer" >
         
          <img onClick={()=>handleLink()}  src={session?.user?.profilePic} alt=""  className='rounded-full h-9 w-9'/>
        </div>
      </div>
    </nav>
    {/* {session && (
    <div className='bg-white text-amber-950 w-40 h-40'> user :{session?.user?.username}
    <button className='bg-red-400'  onClick={()=>signOut()}> out</button>
    </div>)} */}
    
    </>
  )
}

export default Navar