"use client";
import {
   createContext,
   useContext,
   useEffect,
   useState
} from "react";

const UserContext =
   createContext();

export const UserProvider =
({ children })=>{

   const [adminUser,setAdminUser] =
      useState(null);

   const [loading,setLoading] =
      useState(true);

   useEffect(()=>{

      const fetchUser =
      async()=>{

         try{

            const res =
               await fetch("/api/me");

            const data =
               await res.json();

            setAdminUser(data.user);

         }catch(error){

            console.log(error);

         }finally{

            setLoading(false);
         }
      }

      fetchUser();

   },[]);

   return (

      <UserContext.Provider
         value={{
            adminUser,
            setAdminUser,
            loading
         }}
      >

         {children}

      </UserContext.Provider>
   );
}

export const useUser = ()=>{

   return useContext(UserContext);
}