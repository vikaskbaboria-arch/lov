"use client";
import { motion } from "framer-motion";

export default function HomeHero() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative overflow-hidden">

      {/* 🔥 Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

      {/* 🔥 Content */}
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center z-10">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Connect. <br />
            Share. <br />
            <span className="text-blue-400">Express.</span>
          </h1>

          <p className="mt-6 text-gray-400 max-w-md">
            A new way to connect with people, share your moments, and express
            yourself with AI-powered reactions and real-time conversations.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 transition px-6 py-3 rounded-full font-medium shadow-lg">
              Get Started
            </button>
            <button className="border border-gray-700 hover:border-gray-500 transition px-6 py-3 rounded-full">
              Explore
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE (Floating UI Cards) */}
        <div className="relative h-[400px] hidden md:block">

          {/* Post Card */}
          <motion.div
            className="absolute top-0 left-10 bg-slate-900 p-4 rounded-xl shadow-xl w-60"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="h-32 bg-gray-700 rounded-lg mb-3" />
            <p className="text-sm text-gray-300">Had an amazing day 🌄</p>
            <p className="text-xs text-gray-500 mt-1">❤️ 120 likes</p>
          </motion.div>

          {/* Chat Bubble */}
          <motion.div
            className="absolute bottom-10 left-0 bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            Hey! That looks awesome 😍
          </motion.div>

          {/* Emoji Card (AI Feature Hint) */}
          <motion.div
            className="absolute top-20 right-0 bg-slate-900 p-4 rounded-xl shadow-xl w-40 text-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-3xl">😎🔥</p>
            <p className="text-xs text-gray-400 mt-2">AI Reactions</p>
          </motion.div>

          {/* Floating Effect */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-0 right-10 bg-slate-800 px-4 py-2 rounded-lg text-sm shadow"
          >
            New message 💬
          </motion.div>
        </div>
      </div>
    </div>
  );
}