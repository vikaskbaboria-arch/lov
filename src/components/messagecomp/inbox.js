"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InboxSkeleton from "../loading/inboxSkelton";
import { motion } from "framer-motion";
import { Search, Edit3 } from "lucide-react";
import { usePathname } from "next/navigation";
const Inbox = ({ chats }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [rchats, setChat] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (Array.isArray(chats)) {
      setChat(chats);
      setLoading(false);
    }
  }, [chats]);

  const openBos = async (e) => {
    const id = e?._id;
    router.push(`/direct/inbox/${id}`);
  };

  if (loading) {
    return <InboxSkeleton />;
  }

  const filtered = rchats.filter((c) => {
    const q = query.toLowerCase();

    return (
      c?.otherUser?.username?.toLowerCase().includes(q) ||
      c?.lastMessage?.toLowerCase().includes(q)
    );
  });
 
  return (
    <aside className="flex h-full w-full flex-col border-r border-neutral-800 bg-neutral-950">

      {/* HEADER */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h1 className="text-xl font-semibold tracking-tight text-neutral-100">
          Messages
        </h1>

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-900 hover:text-neutral-100"
        >
          <Edit3 className="h-4 w-4" />
        </button>
      </div>

      {/* SEARCH */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/60 px-3 py-2">

          <Search className="h-4 w-4 text-neutral-500" />

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            className="w-full bg-transparent text-sm text-neutral-100 placeholder:text-neutral-500 outline-none"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">

        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-neutral-500">
            No conversations found
          </div>
        )}

        {filtered.map((conv, idx) => {
          const isActive = pathname === `/direct/inbox/${conv._id}`;
          return (
            <motion.div
              key={conv._id}
              onClick={() => openBos(conv)}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, delay: idx * 0.02 }}
          className={`flex items-center gap-3 p-3 cursor-pointer transition-all duration-200 border-b border-neutral-800
${
  isActive
    ? "bg-neutral-800"
    : "hover:bg-[#1c1c1c]"
}`}
          >

            {/* AVATAR */}
            <div className="relative shrink-0">
              <img
                src={conv?.otherUser?.profilePic || "/default.png"}
                alt="user"
                className="h-11 w-11 rounded-full object-cover ring-1 ring-neutral-800"
              />

              {conv?.otherUser?.isOnline && (
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-950" />
              )}
            </div>

            {/* INFO */}
            <div className="min-w-0 flex-1">

              <div className="flex items-center justify-between gap-2">

                <span className="truncate text-sm font-medium text-neutral-200">
                  {conv?.otherUser?.username}
                </span>

                <span className="shrink-0 text-[11px] text-neutral-500">
                  {conv?.updatedAt
                    ? new Date(conv.updatedAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : ""}
                </span>
              </div>

              <div className="mt-0.5 flex items-center justify-between gap-2">

                <p className="truncate text-[13px] text-neutral-500">
                  {conv?.lastMessage || "Start a conversation..."}
                </p>

                {/* unread dot example */}
                {conv?.unread > 0 && (
                  <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-sky-400" />
                )}
              </div>
            </div>
          </motion.div>
        );})}
      </div>
    </aside>
  );
};

export default Inbox;