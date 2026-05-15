"use client";

import React, { useState } from "react";
import  Image  from 'next/image';

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
    <div className="w-full text-white">

  {/* INPUT */}
  <div className="flex items-center gap-3 border-t border-neutral-900 pt-4 pb-3">
    
    <input
      type="text"
      placeholder="Add a comment..."
      value={text}
      onChange={(e) => setText(e.target.value)}
      className="flex-1 bg-transparent outline-none text-[14px] text-neutral-200 placeholder:text-neutral-600"
    />

    <button
      onClick={handleSubmit}
      className="text-[13px] font-medium text-pink-500 hover:text-pink-400 transition"
    >
      Comment
    </button>
  </div>

  {/* COMMENTS */}
  <div className="flex flex-col gap-5 max-h-72 overflow-y-auto pt-3 scrollbar-hide">
    
    {comments?.length === 0 ? (
      <p className="text-[13px] text-neutral-600">
        No comments yet
      </p>
    ) : (
      comments?.map((c) => (
        <div key={c._id} className="flex gap-3">
          
          {/* AVATAR */}
          <Image
            src={c.user.profilePic}
            alt={c.user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />

          {/* COMMENT */}
          <div className="flex-1">
            
            <p className="text-[14px] text-neutral-300 leading-6">
              <span className="font-semibold text-white mr-1">
                {c.user.name}
              </span>
              {c.text}
            </p>

            {/* OPTIONAL ACTIONS */}
            <div className="flex items-center gap-4 mt-1 text-[12px] text-neutral-600">
              <span className="cursor-pointer hover:text-neutral-400">
                Reply
              </span>

              <span className="cursor-pointer hover:text-neutral-400">
                Like
              </span>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
</div>
  );
};

export default Comment;