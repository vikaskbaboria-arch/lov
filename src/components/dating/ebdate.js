"use client";

import React,
{
   useEffect,
   useState
} from "react";

import { useUser }
from "@/context/UserContext";

const Ebdate = ()=>{

   const {
      adminUser,
      setAdminUser
   } = useUser();

   const [isEnabled,setIsEnabled]
      = useState(false);

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

      const data =
         await res.json();

      if(res.ok){

         setIsEnabled(updatedValue);

         setAdminUser({
            ...adminUser,
            isDatingEnabled:
               updatedValue
         });
      }
   }

   return (

      <button onClick={handleSubmit}>

         {
            isEnabled
            ? "Disable Dating"
            : "Enable Dating"
         }

      </button>
   );
}

export default Ebdate;