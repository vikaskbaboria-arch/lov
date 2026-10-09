"use client";

import { usePathname } from "next/navigation";

export default function InboxResponsiveShell({ inbox, children }) {
  const pathname = usePathname();
  const conversationOpen = pathname.startsWith("/direct/inbox/") || pathname.startsWith("/dating/chat/");

  return (
    <div className="flex h-[calc(100dvh_-_7.75rem_-_env(safe-area-inset-bottom))] min-h-0 overflow-hidden bg-neutral-950 text-neutral-100 md:h-[calc(100dvh_-_4rem)]">
      <aside className={`${conversationOpen ? "hidden" : "flex"} min-h-0 w-full shrink-0 flex-col border-r border-neutral-800 md:flex md:w-[34%] lg:w-[380px]`}>
        {inbox}
      </aside>
      <main className={`${conversationOpen ? "flex" : "hidden"} min-h-0 min-w-0 flex-1 flex-col md:flex`}>
        {children}
      </main>
    </div>
  );
}
