"use client"
import React, { useEffect } from 'react'
import  Image  from 'next/image';
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
    if(image){ const formdata = new FormData()
     formdata.append('image',image);
    
        const res = await fetch('/api/upload',{
      method:'POST',
      body:formdata
     })
     const data = await res.json();
     setProfile({...profile,profilePic:data?.data?.secure_url})
    }
   
     const res2 = await fetch('/api/user/update',{
      method:'PUT',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({profilePic:profile.profilePic,bio:profile.bio,username:profile.username, name:profile.name, interests:profile.interests})
     })
     const data2= await res2.json();
      // console.log(data2);
      update({profilePic:profile.profilePic,username:profile.username})
    
    }


    useEffect(()=>{
      const fetchInterests = async()=>{
        const res = await fetch ('api/user/interest',{
          method:'GET',
          headers:{'Content-Type':'application/json'}
        })
        const data = await res.json();
        console.log("interest",data)
        setSelectedInterests(data?.interests ||[]);
      }
      fetchInterests();
    },[])
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
    
  <div className="lov-overlay">
    <div className="lov-modal w-full max-w-4xl p-6 relative">
      
      {/* Close Button */}
      <button
        onClick={() => setEdit(false)}
        className="absolute top-3 right-3 text-neutral-500 hover:text-neutral-100"
      >
        ✕
      </button>

      {/* Title */}
      <h2 className="text-xl text-neutral-50 font-semibold text-center mb-4">
        Edit Profile
      </h2>

      {/* Profile Image */}
      <div className="flex flex-col items-center mb-4">
        <Image
          src={session?.user?.profilePic }
          alt="profile"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full border border-neutral-800 mb-2"
        />
        <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-neutral-200 bg-neutral-900 border border-neutral-800 rounded px-2 py-1" />
      </div>

      {/* Username */}
      <div className="mb-3">
        <label className="text-sm text-neutral-400">Username</label>
        <input
          type="text"
          placeholder="Enter username"
          onChange={(e)=>setProfile({...profile,username:e.target.value})}
          className="lov-input mt-1"
        />
      </div>
        <div className="mb-3">
        <label className="text-sm text-neutral-400">Name</label>
        <input
          type="text"
          placeholder="Enter name"
          onChange={(e)=>setProfile({...profile,name:e.target.value})}
          className="lov-input mt-1"
        />
      </div>
      {/* Bio */}
      <div className="mb-3">
        <label className="text-sm text-neutral-400">Bio</label>
        <textarea
          onChange={(e)=>setProfile({...profile,bio:e.target.value})}
          placeholder="Write something..."
          className="lov-input mt-1 resize-none"
          rows="3"
        />
      </div>
        <div className="mb-3">
        <label className="text-sm text-neutral-400">Interests</label>
       <div className="mt-2">
  <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 snap-x">
    {INTERESTS.map((interest) => {
      const isSelected = selectedInterests.includes(interest);

      return (
        <button
          key={interest}
          onClick={() => toggleInterest(interest)}
          className={`group relative flex-shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 border backdrop-blur-md snap-start
            ${
              isSelected
                ? "bg-neutral-900 text-neutral-100 border-pink-500/50 shadow-lg shadow-pink-500/10"
                : "bg-white/5 text-neutral-400 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-600 hover:text-neutral-200"
            }`}
        >
          <span className="capitalize tracking-wide">
            {interest}
          </span>

          {isSelected && (
            <span className="ml-2 text-xs">✦</span>
          )}
        </button>
      );
    })}
  </div>
</div>
        </div>
      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <button
          onClick={() => setEdit(false)}
          className="lov-btn-ghost"
        >
          Cancel
        </button>
        <button onClick={()=>handleChange()} className="lov-btn-primary">
          Save
        </button>
      </div>
    </div>
  </div>

  )
}

export default EditProfile