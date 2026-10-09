import Inbox from "@/components/messagecomp/inbox";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import InboxResponsiveShell from "@/components/messagecomp/InboxResponsiveShell";
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
   
  return <InboxResponsiveShell inbox={<Inbox chats={data} />}>{children}</InboxResponsiveShell>;
}
