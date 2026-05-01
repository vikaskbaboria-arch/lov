"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
export default function RegisterPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
   
  const sendOtp= async()=>{
    setOtpSent(true);
    try {
        const res = await fetch('/api/send-otp',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:form.email})


     })
     const data = await res.json()
     console.log(data)
    } catch (error) {
        console.error(error)
    }
     
  }
  
  const register =async()=>{
    
    try{
        const res = await fetch('/api/register',{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({username:form.name,email:form.email,password:form.password}),

        })
        const data = await res.json();
        console.log('conversation:', data)
           const login = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: true,
      callbackUrl: "/"
    });

    
    }
        catch(error){
       console.error(error)
        }
  }
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp:""
 
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    
  };

const verifyOtp=async()=>{
    try {
        const res = await fetch('/api/verify-otp',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:form.email,otp:form.otp})
        })
        const data = await res.json();
        console.log("data :" + data)
    } catch (error) {
         console.error(error)
    }
}
const FloatingHeart = ({ style }) => (
  <div className="floating-heart" style={style}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#hg)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2d78" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
    <style>{`
      .floating-heart {
        position: absolute;
        animation: floatUp 8s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateY(-40px) scale(1.2); opacity: 0.4; }
        100% { transform: translateY(0) scale(1); opacity: 0.7; }
      }
    `}</style>
  </div>
);
 const hearts = [
    { top: "15%", left: "8%", animationDelay: "0s", animationDuration: "7s" },
    { top: "60%", left: "5%", animationDelay: "1s", animationDuration: "9s" },
    { top: "30%", right: "6%", animationDelay: "2s", animationDuration: "8s" },
    { top: "70%", right: "10%", animationDelay: "0.5s", animationDuration: "6s" },
    { top: "80%", left: "20%", animationDelay: "3s", animationDuration: "10s" },
    { top: "20%", right: "22%", animationDelay: "1.5s", animationDuration: "7.5s" },
  ];
  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "6rem 2rem 4rem",
      
    }}>
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
       
     
        body {
          background: #060210;
          color: white;
          font-family: 'Courier New', monospace;
          overflow-x: hidden;
        }
     
      `}</style>
      {/* Animated Background */}
     
      {/* Glow blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,45,120,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} /> 
      <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,45,120,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "15%",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      {hearts.map((s, i) => <FloatingHeart key={i} style={s} />)}


      {/* Card */}
      <div    className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-pink-500/20 bg-white/5 shadow-[0_0_40px_rgba(255,45,120,0.2)]">

        <h1 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h1>

        <div className="space-y-4">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="User Name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-black/40 border border-gray-700 p-3 rounded-lg outline-none focus:border-purple-400"
          />

          {/* Email + OTP */}
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="flex-1 bg-black/40 border border-gray-700 p-3 rounded-lg outline-none focus:border-purple-400"
            />

            <button  
              onClick={sendOtp}
              style={{
            padding: "0.85rem 2.2rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
            color: "rgba(255,255,255,0.8)", fontSize: "1rem",
            fontFamily: "monospace", fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#a855f7"; e.target.style.color = "#a855f7"; e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.3)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.boxShadow = "none"; }}
              className=" px-4 rounded-lg font-medium "
            >
              Send
            </button>
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full bg-black/40 border border-gray-700 p-3 rounded-lg outline-none focus:border-purple-400 pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* OTP */}
          {otpSent && (
            <>
            <div className=" flex gap-2">


            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={form.otp}
              onChange={handleChange}
              className="flex-1 bg-black/40 border border-gray-700 p-3 rounded-lg outline-none focus:border-purple-400"
            />
              <button style={{
            padding: "0.85rem 2.2rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
            color: "rgba(255,255,255,0.8)", fontSize: "1rem",
            fontFamily: "monospace", fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#a855f7"; e.target.style.color = "#a855f7"; e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.3)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.boxShadow = "none"; }} onClick={()=>verifyOtp()}
               className =" px-4 rounded-lg font-medium "
            >
              verify
            </button>            </div></>
          )}

          {/* Register */}
          <button  
          className="w-full bg-purple-500  p-3 rounded-lg font-semibold " onClick={()=>register()}>
            Register
          </button>

        </div>

        <p className="text-sm text-center mt-5 text-gray-400">
          Already have an account? 
          
          <button >Login</button>
        </p>

      </div>
    </div>
  );
}