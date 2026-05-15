"use client";

import { useEffect, useState } from "react";
import  Image  from 'next/image';
import CreateNgl from "../nglComp/createNgl";


export default function SidePanel() {
  
const [ngl,setNgl] = useState([])
const [showNgl,setShowNgl] = useState(false)
useEffect(()=>{
  const fetchData = async()=>{
    const res = await fetch('/api/post/ngl',{
      method:'GET'
    })
    const data= await res.json();
    console.log(data)
    setNgl(data)
  }
  fetchData();
},[])

  return (
    <>
    
    <div className="sticky top-[52px] p-5 pt-6">

      {/* Me */}
   

      {/* Suggested */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] font-medium text-neutral-300">
          NGL
        </span>

        <div >
        <button className="text-[12px] pr-3 text-neutral-400 hover:text-white transition-colors duration-150">
         Filter
        </button>
        <button onClick={()=>{setShowNgl(!showNgl)}} className="text-[14px] text-neutral-200 hover:text-white transition-colors duration-150">
          +
        </button></div>
      </div>

      <div className="flex flex-col">
        {ngl?.map((u) => (
          <div
            key={u._id}
            className="flex items-center gap-2.5 py-2 group"
          >
            <div className="w-9 h-9 shrink-0 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-base group-hover:border-neutral-600 transition-colors duration-150">
              <Image src={u?.author?.profilePic} width={36} height={36} className="w-9 h-9 rounded-full" alt="" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-medium text-neutral-400 truncate">
                {u.author.username}
              </p>
              <p className="text-[16px] text-neutral-200 truncate">
                {u.text}
              </p>
            </div>

          
          </div>
        ))}
      </div>

      {/* Footer */}

    </div>
    {
      showNgl &&
      <CreateNgl/>
    }
    </>
  );
}