"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
const EditProfile = ({setEdit}) => {
    const { data: session ,update} = useSession();
    const [profile,setProfile] = useState({username:session?.user?.username,bio:"",profilePic:session?.user?.profilePic,name:session?.user?.name})
    
    const [image,setImage] = useState(null)
    console.log(session?.user?.profilePic);
    const handleImage = (e) => {
      const file = e.target.files[0]
      if (!file) return
      setImage(file)
    }

    const handleChange =async()=>{
     const formdata = new FormData()
     formdata.append('image',image);
    
     const res = await fetch('/api/upload',{
      method:'POST',
      body:formdata
     })
     const data = await res.json();
     const res2 = await fetch('/api/user/update',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({profilePic:data?.data?.secure_url,bio:profile.bio,username:profile.username, name:profile.name})
     })
     const data2= await res2.json();
      // console.log(data2);
      update({profilePic:data?.data?.secure_url,username:profile.username})
    
    }


  return (
    
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    
    {/* Modal Box */}
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative">
      
      {/* Close Button */}
      <button
        onClick={() => setEdit(false)}
        className="absolute top-3 right-3 text-gray-500 hover:text-black"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl text-black/80 font-semibold text-center mb-4">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={session?.user?.profilePic || 'https://via.placeholder.com/150'}
          alt="profile"
          className="w-24 h-24 rounded-full border mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
      </div>

      {/* Username */}
      <div className="mb-3">
        <label className="text-sm text-gray-600">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e)=>setProfile({...profile,username:e.target.value})}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
        <div className="mb-3">
        <label className="text-sm text-gray-600">Username</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e)=>setProfile({...profile,name:e.target.value})}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {/* Bio */}
      <div className="mb-3">
        <label className="text-sm text-gray-600">Bio</label>
        <textarea
          onChange={(e)=>setProfile({...profile,bio:e.target.value})}
          placeholder="Write something..."
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setEdit(false)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button onClick={()=>handleChange()} className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
          Save
        </button>
      </div>
    </div>
  </div>

  )
}

export default EditProfile