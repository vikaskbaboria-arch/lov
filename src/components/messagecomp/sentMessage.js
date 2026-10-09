"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";

const SentMessage = ({ convId, senderId, setChat }) => {
  const [text, setText] = useState("");

  const handleSend = async() => {
    if (!text.trim()) return;
    await fetch('/api/message/send/',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({text:text,convId:convId,senderId:senderId})
    })
    setText("")
  };

  return (
    <div className="flex flex-col h-full justify-between bg-neutral-950 border-t border-neutral-800">
      <div className="flex items-center gap-2 px-4 py-3">
         <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="lov-input flex-1 rounded-full py-2.5"
        />
        <button
          type="button"
          onClick={handleSend}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-500 text-white transition hover:bg-rose-400"
          aria-label="Send message"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default SentMessage;
