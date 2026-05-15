"use client"

import React, { useState } from 'react'

const CreateNgl = () => {
    const [ngl,setNgl]= useState({text:"",isAnonymous:false})
    const [text,setText] = useState("")
    const [isAnonymous,setisAnonymous]= useState(false)
    const handleClick = async ()=>{
             const res = await fetch('/api/post/ngl',
              {
                method:'POST',
                headers:{
                  'content-type':'application/json'
                },
                body:JSON.stringify({text,isAnonymous})
              },
             
             )
             const data = await res.json()
             console.log(data)
    }
  return (
<div className="w-full max-w-xl mx-auto p-4 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
  
  <textarea
    placeholder="Write something..."
    onChange={(e) => setText(e.target.value)}
    className="
      w-full min-h-[120px]
      bg-transparent
      text-white
      placeholder:text-gray-400
      outline-none
      resize-none
      text-sm
      p-3
    "
  />

  <div className="flex items-center justify-between mt-4">
    
    <button
      onClick={() => setisAnonymous(!isAnonymous)}
      className={`
        px-4 py-2 rounded-2xl
        text-sm font-medium
        transition-all duration-300
        border
        ${
          isAnonymous
            ? "bg-zinc-800 border-zinc-700 text-white"
            : "bg-white/10 border-white/10 text-gray-300"
        }
      `}
    >
      {isAnonymous ? "🔒 Anonymous" : "👤 Named"}
    </button>

    <button
      onClick={handleClick}
      className="
        px-5 py-2 rounded-2xl
        bg-emerald-500
        hover:bg-emerald-400
        active:scale-95
        transition-all duration-300
        text-white font-semibold
        shadow-lg shadow-emerald-500/20
      "
    >
      Submit
    </button>

  </div>
</div>
  )
}

export default CreateNgl