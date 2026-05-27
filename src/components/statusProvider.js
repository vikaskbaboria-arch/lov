"use client";

import { useEffect } from "react";

export default function StatusProvider({ session }) {
  
if(session!=="authenticated") return null;
   const updateStatus = async(isOnline)=>{

      await fetch("/api/user/status",{
         method:"PATCH",
         headers:{
            "Content-Type":"application/json"
         },
         body: JSON.stringify({
            userId: session?.user?.id,
            isOnline
         })
      });

   };

   useEffect(()=>{

      updateStatus(true);

      const handleOffline = ()=>{
         updateStatus(false);
      };

      window.addEventListener(
         "beforeunload",
         handleOffline
      );

      return ()=>{
         window.removeEventListener(
            "beforeunload",
            handleOffline
         );

         updateStatus(false);
      };

   },[]);

   return null;
}