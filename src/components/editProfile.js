"use client"
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { INTERESTS } from '@/contants/interest'
const EditProfile = ({setEdit}) => {
    const { data: session ,update} = useSession();
    const [profile,setProfile] = useState({username:session?.user?.username,bio:"",profilePic:session?.user?.profilePic,name:session?.user?.name,interests:[]})
    const[selectedInterests,setSelectedInterests] = useState([]);
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
      body:JSON.stringify({profilePic:data?.data?.secure_url,bio:profile.bio,username:profile.username, name:profile.name, interests:profile.interests})
     })
     const data2= await res2.json();
      // console.log(data2);
      update({profilePic:data?.data?.secure_url,username:profile.username})
    
    }
 const toggleInterest = (interest) => {

  let updated;

  if (selectedInterests.includes(interest)) {
    updated = selectedInterests.filter(
      (item) => item !== interest
    );
  } else {
    updated = [...selectedInterests, interest];
  }

  setSelectedInterests(updated);

  setProfile({
    ...profile,
    interests: updated,
  });
};

  return (
    
  <div className="fixed inset-0  bg-black/70 flex items-center justify-center z-50">
    
    {/* Modal Box */}
    <div className="bg-black/90 w-full max-w-4xl rounded-2xl shadow-lg p-6 relative border border-gray-700">
      
      {/* Close Button */}
      <button
        onClick={() => setEdit(false)}
        className="absolute top-3 right-3 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl text-white font-semibold text-center mb-4">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={session?.user?.profilePic || 'https://via.placeholder.com/150'}
          alt="profile"
          className="w-24 h-24 rounded-full border border-gray-600 mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-white bg-gray-800 border border-gray-600 rounded px-2 py-1" />
      </div>

      {/* Username */}
      <div className="mb-3">
        <label className="text-sm text-gray-300">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e)=>setProfile({...profile,username:e.target.value})}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
        <div className="mb-3">
        <label className="text-sm text-gray-300">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e)=>setProfile({...profile,name:e.target.value})}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>
      {/* Bio */}
      <div className="mb-3">
        <label className="text-sm text-gray-300">Bio</label>
        <textarea
          onChange={(e)=>setProfile({...profile,bio:e.target.value})}
          placeholder="Write something..."
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 mt-1 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          rows="3"
        />
      </div>
        <div className="mb-3">
        <label className="text-sm text-gray-300">Interests</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {INTERESTS.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-3 py-1 rounded-full text-sm ${
                selectedInterests.includes(interest)
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {interest}
            </button>
          ))}
        </div>
        </div>
      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setEdit(false)}
          className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
        >
          Cancel
        </button>
        <button onClick={()=>handleChange()} className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-all">
          Save
        </button>
      </div>
    </div>
  </div>

  )
}

export default EditProfile