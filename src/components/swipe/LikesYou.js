"use client";

import React,
{
   useEffect,
   useState
} from "react";

import {
   Heart,
   MapPin
} from "lucide-react";

const LikesYou = ()=>{

   const [likes,setLikes] =
      useState([]);

   const [loading,setLoading]
      = useState(true);

   useEffect(()=>{

      const fetchLikes =
      async()=>{

         try{

            const res =
               await fetch(
                  "/api/dating/liked-you"
               );

            const data =
               await res.json();

            console.log(data);

            setLikes(data.likes);

         }catch(error){

            console.log(error);

         }finally{

            setLoading(false);
         }
      }

      fetchLikes();

   },[]);

   if(loading){

      return (

         <div className="p-6 text-white">

            Loading...

         </div>
      );
   }

   if(likes.length === 0){

      return (

         <div className="flex h-[60vh] items-center justify-center text-neutral-400">

            No likes yet

         </div>
      );
   }

   return (

      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">

         {likes.map((like)=>{

            const user =
               like.fromUser;

            return (

               <div
                  key={like._id}
                  className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950"
               >

                  <div className="relative h-[320px] w-full">

                     <img
                        src={
                           user?.profilePic
                        }
                        alt="profile"
                        className="h-full w-full object-cover"
                     />

                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                     <div className="absolute bottom-4 left-4">

                        <h2 className="text-2xl font-bold text-white">

                           {user?.name ||
                              user?.username}

                           {user?.age &&
                              `, ${user.age}`}
                        </h2>

                        <p className="mt-1 max-w-[250px] text-sm text-neutral-300">

                           {user?.bio}
                        </p>
                     </div>

                     <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-pink-500 px-3 py-1 text-sm font-medium text-white">

                        <Heart
                           size={14}
                           fill="white"
                        />

                        Liked You
                     </div>
                  </div>

                  <div className="flex items-center justify-between p-4">

                     <button
                        className="rounded-full bg-pink-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-pink-600"
                     >
                        Match Back
                     </button>

                     <button
                        className="rounded-full border border-neutral-700 px-5 py-2 text-sm text-neutral-300 transition hover:bg-neutral-900"
                     >
                        Ignore
                     </button>
                  </div>
               </div>
            );
         })}
      </div>
   );
}

export default LikesYou;