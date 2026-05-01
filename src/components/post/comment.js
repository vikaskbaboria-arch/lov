"use client";

import React, { useState } from "react";

const Comment = ({postId,comment}) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState(comment);

  const handleSubmit = async () => {
    if (!text.trim()) return;
    const res = await  fetch('/api/comment/',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({postId,text})
    })
    const data = await res.json()
     console.log(data)
     setComments(comment)
  };
    
  return (
    <div className="w-full max-w-md mx-auto p-4 bg-zinc-900 text-white rounded-2xl shadow-lg">
      
      {/* Input Box */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 rounded-xl bg-zinc-800 outline-none"
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 rounded-xl hover:bg-blue-700"
        >
          Send
        </button>
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-gray-400 text-sm">No comments yet</p>
        ) : (
          comments.map((c) => (
            <div key={c._id} className="text-white">
              <div className="flex items-center gap-2 mb-1">
           <span className="w-8 h-8 rounded-full overflow-hidden">
            <img src={c.user.profilePic} alt={c.user.name} />
           </span>
           
           <span className=" font-semibold">{c.user.name}</span>
           
           <span className="text-sm">{c.text}</span>
              </div>
         
             

           
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Comment;