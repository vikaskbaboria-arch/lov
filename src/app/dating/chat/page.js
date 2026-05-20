import { getServerSession } from "next-auth";
import GlitchText from "@/components/ui/GlitchText";
import { NextResponse } from "next/server";

import { redirect } from "next/navigation";
const MainBox = () => {
  
    

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950">

      <div className="flex h-full w-full items-center justify-center">
  
     <GlitchText text="Select a conversation" className="text-4xl " />
</div>   
    </div>
  );
};

export default MainBox;