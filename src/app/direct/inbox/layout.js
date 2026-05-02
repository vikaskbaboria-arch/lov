import Inbox from "@/components/messagecomp/inbox";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Providers from "@/components/providers";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function Layout({ children }) {
   const session = await getServerSession(authOptions)
  
  
   const userId = session?.user?.id
   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/conversation/${userId}`,{
    method:'GET',
    headers:{
      'content-type':'application/json'
    }
   })
   const data = await res.json();
 if(!session){
  redirect('/login')
 }
   
  return (
    <div className="flex  h-[91vh] overflow-hidden  ">
      
      {/* LEFT - Inbox */}
      <div className="w-1/3 border-r overflow-y-auto ">
       <Inbox chats={data} />
      </div>

      {/* RIGHT - Chat */}
      <div className="w-2/3 overflow-y-auto ">

      <Providers> {children}</Providers>
       
      </div>

    </div>
  );
}