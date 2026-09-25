"use client";

import React,
{
   useEffect,
   useState
} from "react";

import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useUser }
from "@/context/UserContext";

const BURST_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

const Ebdate = ()=>{

   const {
      adminUser,
      setAdminUser
   } = useUser();

   const [isEnabled,setIsEnabled]
      = useState(false);

   const [burstKey, setBurstKey] = useState(0);

   useEffect(()=>{

      if(adminUser){

         setIsEnabled(
            adminUser.isDatingEnabled
         );
      }

   },[adminUser]);

   const handleSubmit = async()=>{

      const updatedValue =
         !isEnabled;

      const res = await fetch(
         "/api/dating/togggle",
         {
            method:"PATCH",

            headers:{
               "Content-Type":
               "application/json"
            },

            body:JSON.stringify({
               isDatingEnabled:
                  updatedValue
            })
         }
      );

      if(res.ok){

         setIsEnabled(updatedValue);

         if (updatedValue) {
            setBurstKey(k => k + 1);
         }

         setAdminUser({
            ...adminUser,
            isDatingEnabled:
               updatedValue
         });
      }
   }

   return (

      <motion.button
         onClick={handleSubmit}
         className={`fixed right-4 bottom-20 -translate-y-1/2 z-40 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold overflow-visible ${
            isEnabled
               ? "border border-neutral-700 bg-neutral-900 text-neutral-300 hover:bg-neutral-800 hover:text-neutral-100"
               : "bg-red-500 text-white hover:bg-red-600"
         }`}
         animate={{
            boxShadow: isEnabled
               ? "0 0 0px rgba(239,35,60,0)"
               : "0 0 20px rgba(239,35,60,0.35)",
         }}
         transition={{ duration: 0.35 }}
         whileTap={{ scale: 0.94 }}
      >
         {/* Ambient pulse ring while dating is active */}
         {isEnabled && (
            <motion.span
               className="pointer-events-none absolute inset-0 rounded-full border border-accent/40"
               animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0, 0.5] }}
               transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
         )}

         {/* Heart pop on toggle */}
         <span className="relative inline-flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
               <motion.span
                  key={isEnabled ? "on" : "off"}
                  initial={{ scale: 0.4, rotate: -15, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.4, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 18 }}
                  className="inline-flex"
               >
                  <Heart size={15} className={isEnabled ? "text-neutral-500" : "fill-white"} />
               </motion.span>
            </AnimatePresence>

            {/* Burst particles, fired once per "enable" click — never on initial mount */}
            <AnimatePresence>
               {burstKey > 0 && BURST_ANGLES.map(angle => (
                  <motion.span
                     key={`${burstKey}-${angle}`}
                     className="pointer-events-none absolute h-1 w-1 rounded-full bg-red-500"
                     initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                     animate={{
                        x: Math.cos((angle * Math.PI) / 180) * 22,
                        y: Math.sin((angle * Math.PI) / 180) * 22,
                        opacity: 0,
                        scale: 0.4,
                     }}
                     transition={{ duration: 0.55, ease: "easeOut" }}
                  />
               ))}
            </AnimatePresence>
         </span>

         {
            isEnabled
            ? "Disable Dating"
            : "Enable Dating"
         }

      </motion.button>
   );
}

export default Ebdate;