

import React from "react";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0b0a10] text-white">
      
      <style>{`
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }

        @keyframes fadeSlide {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }

        .spinner {
          animation: rotate 5s linear infinite;
        }

        .fade-slide {
          animation: fadeSlide 0.6s ease forwards;
        }

        .progress-bar {
          animation: progress 1.4s ease-in-out infinite;
        }
      `}</style>

      {/* Logo mark */}
      <div className="relative mb-10 fade-slide">
        
        {/* outer ring */}
        <div className="w-20 h-20 rounded-full border border-white/10"></div>

        {/* rotating accent */}
        <div className="absolute inset-0 rounded-full border border-transparent border-t-purple-500 border-r-pink-500 spinner"></div>

        {/* inner logo */}
        <div className="absolute inset-0 flex items-center justify-center">
        💜
        </div>
      </div>

      {/* Brand */}
      <h1 className="text-2xl font-medium tracking-wide fade-slide">
        lov<span className="text-purple-400">.</span>
      </h1>

      {/* Tagline */}
      <p className="text-gray-500 text-xs tracking-wide mt-1 fade-slide">
        meet someone real
      </p>

      {/* Progress indicator */}
      <div className="w-40 h-[2px] bg-white/10 mt-8 overflow-hidden rounded-full">
        <div className="w-1/3 h-full bg-gradient-to-r from-pink-500 to-purple-500 progress-bar"></div>
      </div>

      {/* Status text */}
      <p className="text-gray-600 text-xs mt-6 fade-slide">
        setting things up...
      </p>
    </div>
  );
};

export default Loading;