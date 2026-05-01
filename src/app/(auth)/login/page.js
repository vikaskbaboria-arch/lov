
"use client"

import { signIn } from "next-auth/react"
// import { useState } from "react"

// export default function LoginPage() {

//   const [email,setEmail] = useState("")
//   const [password,setPassword] = useState("")

  // const handleLogin = async () => {

  //   const result = await signIn("credentials",{
  //     email,
  //     password,
  //     redirect:false
  //   })

  //   if(result.error){
  //     alert("Login failed")
  //   }else{
  //     alert("Login success")
  //   }

  // }

//   return (

//     <div>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e)=>setEmail(e.target.value)}
//       />

//       <input
//         placeholder="Password"
//         type="password"
//         value={password}
//         onChange={(e)=>setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>
//         Login
//       </button>

//     </div>

//   )

// }

// "use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
     const result = await signIn("credentials",{
      email:form?.email,
      password:form?.password,
      
    })

    if(result.error){
      alert("Login failed")
    }else{
      alert("Login success")
    }
    // frontend only
    setTimeout(() => {
      setLoading(false);
      console.log(form);
    }, 1000);
  };


   const hearts = [
    { top: "15%", left: "8%", animationDelay: "0s", animationDuration: "7s" },
    { top: "60%", left: "5%", animationDelay: "1s", animationDuration: "9s" },
    { top: "30%", right: "6%", animationDelay: "2s", animationDuration: "8s" },
    { top: "70%", right: "10%", animationDelay: "0.5s", animationDuration: "6s" },
    { top: "80%", left: "20%", animationDelay: "3s", animationDuration: "10s" },
    { top: "20%", right: "22%", animationDelay: "1.5s", animationDuration: "7.5s" },
  ];
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
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060210] relative overflow-hidden">
      
      {/* Glow background (same vibe as your hero) */}
      <div className="absolute w-[300px] h-[300px] bg-pink-500/20 blur-3xl rounded-full top-20 left-20" />
      <div className="absolute w-[250px] h-[250px] bg-purple-500/20 blur-3xl rounded-full bottom-20 right-20" />
         {hearts.map((s, i) => <FloatingHeart key={i} style={s} />)}

      {/* Card */}
      <div className="relative z-10 w-full max-w-md p-8 rounded-2xl backdrop-blur-xl border border-pink-500/20 bg-white/5 shadow-[0_0_40px_rgba(255,45,120,0.2)]">

        {/* Logo */}
        <h1 className="text-4xl font-bold text-center mb-2 font-mono tracking-widest bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          LOV
        </h1>

        <p className="text-center text-gray-400 text-sm mb-6 font-mono">
          welcome back ♥
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-pink-500 focus:shadow-[0_0_10px_rgba(255,45,120,0.5)] transition"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
            className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white outline-none focus:border-purple-500 focus:shadow-[0_0_10px_rgba(168,85,247,0.5)] transition"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-2 rounded-lg font-mono font-bold tracking-wide bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition shadow-[0_0_20px_rgba(255,45,120,0.5)] disabled:opacity-50"
          >
            {loading ? "logging in..." : "login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-xs mt-6 font-mono">
          don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-pink-400 cursor-pointer hover:underline"
          >
            register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;