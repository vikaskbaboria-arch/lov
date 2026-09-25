import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
   UserProvider
} from "@/context/UserContext";
import StatusListener from "@/components/statusListner";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route.js";
import Navar from "@/components/navbar";
import StatusProvider from "@/components/statusProvider";
import Providers from "@/components/providers";
import Ebdate from "@/components/dating/ebdate";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Lov",
  description: "Find your love ones",
};

export default async function RootLayout({ children }) {
  const session = await  getServerSession(authOptions);
  return (
    <html lang="en">
     
      <body

        className={`${geistSans.variable} ${geistMono.variable} antialiased  `} 
      >
     <UserProvider>
     <StatusProvider session={session}/>
     {/* <StatusListener/> */}
       <Providers> 
     {/* <Navar/> */}
     {/* spacer */}
        
          {children}
          <Ebdate  />
        </Providers></UserProvider>
      </body>
    </html>
  );
}
