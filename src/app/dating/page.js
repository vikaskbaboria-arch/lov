"use client"
import React from "react";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import Navar from "@/components/navbar";

import { useUser }from "@/context/UserContext";
const CURRENT_USER_AVATAR = "https://i.pravatar.cc/300?img=48";

export default function Page() {

   const {adminUser,loading} = useUser();
   console.log(adminUser)
   if(!adminUser?.isDatingEnabled){
    return <div>
      enable dating to see 
    </div>
   }
  return (

    <>
    <Navar/>
    <div
      className="dark min-h-[calc(100vh-63px)] bg-neutral-950 text-neutral-100 antialiased"
      data-testid="swipe-page"
    >
      {/* ambient backdrop */}
      <div className="pointer-events-none fixed inset-0\">
        <div className="absolute -left-32 top-1/3 h-72 w-72 rounded-full bg-rose-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-sky-500/5 blur-3xl" />
      </div>

      <main className="relative mx-auto flex min-h-full max-w-3xl flex-col items-center px-4 py-6 sm:py-8">
 

        <SwipeDeck currentUserAvatar={CURRENT_USER_AVATAR} />

    
      </main>
    </div></>
  );
}