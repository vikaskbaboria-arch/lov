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
    <div className='bg-red-500'>
    <input type="text" name="" id="" onChange={(e)=>(setText(e.target.value))} />
    <button onClick={()=>setisAnonymous(!isAnonymous)}  >
        {isAnonymous ? '🔒 Anonymous' : '👤 Named'
        }</button>
   <button onClick={handleClick}>Submit</button>
    </div>
  )
}

export default CreateNgl