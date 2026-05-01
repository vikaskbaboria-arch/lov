"use client";
import React, { useState } from "react";

const SentMessage = ({ convId, senderId }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async() => {
    if (!text.trim()) return;
    const res = await fetch('/api/message/send/',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({text:text,convId:convId,senderId:senderId})
    })
    const data = await res.json()
    console.log(data)

  setText("")
    // frontend only → just store locally
   
  };

  return (
    <div className="flex flex-col h-full justify-between "  style={{  background: "rgba(10,5,25,0.9)",}}>
      
      {/* Messages */}
      <div style={{
        padding: "0.8rem 1.2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", gap: "0.6rem", alignItems: "center",
      }}>
       
         <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          tyle={{
          flex: 1, background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px", padding: "0.5rem 0.9rem",
          color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "monospace",
        }}
          className="flex-1 border rounded-lg px-3 py-2 outline-none"
        />
        <div  onClick={handleSend} style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #ff2d78, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", cursor: "pointer",
        }}>♥</div>
      </div>

      {/* Input + Button */}
    
    </div>
  );
};

export default SentMessage;