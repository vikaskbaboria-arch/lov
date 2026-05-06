import React from 'react'
import Profile from '@/components/profile.js';


const ProfilePage = async({ params }) => {
  const {username} =await params;
  
 console.log(username);
  return (
    <Profile username={username} classname="h-[93vh]" /> // ✅ correct
  )
}

export default ProfilePage