"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Heart, House, LogOut, MessageCircle, UserRound } from "lucide-react";
import GlitchText from "./ui/GlitchText";

const NavLink = ({ href, icon: Icon, label, active, mobile = false }) => (
  <Link
    href={href}
    aria-current={active ? "page" : undefined}
    className={mobile
      ? `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl px-1 py-1.5 text-[10px] font-medium transition-colors ${active ? "text-rose-300" : "text-neutral-500 hover:text-neutral-200"}`
      : `inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-rose-500/10 text-rose-300" : "text-neutral-400 hover:bg-white/[0.04] hover:text-white"}`}
  >
    <Icon className={mobile ? "h-5 w-5" : "h-4 w-4"} strokeWidth={active ? 2.3 : 1.8} />
    <span className="truncate">{label}</span>
  </Link>
);

export default function Navar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading" || !session) return null;

  const username = session?.user?.username;
  const profileHref = username ? `/${username}` : "/";
  const isHome = pathname === "/";
  const isMessages = pathname.startsWith("/direct/inbox") || pathname.startsWith("/dating/chat");
  const isDating = pathname.startsWith("/dating") && !pathname.startsWith("/dating/chat");
  const isProfile = username && (pathname === profileHref || pathname.startsWith(`${profileHref}/`));

  return (
    <>
      <header className="sticky top-0 z-[60] flex h-14 w-full items-center justify-between border-b border-neutral-800/90 bg-neutral-950/90 px-4 text-neutral-100 backdrop-blur-xl sm:px-6 md:h-16">
        <Link href="/" aria-label="Lov home" className="shrink-0 text-xl font-bold" style={{ fontFamily: "'VT323', 'Courier New', monospace" }}>
          <GlitchText className="text-2xl" text="lov" />
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          <NavLink href="/" icon={House} label="Home" active={isHome} />
          <NavLink href="/direct/inbox" icon={MessageCircle} label="Messages" active={isMessages} />
          <NavLink href="/dating/discover" icon={Heart} label="Dating" active={isDating} />

          <Link
            href={profileHref}
            aria-label="Profile"
            aria-current={isProfile ? "page" : undefined}
            className={`ml-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition ${isProfile ? "border-rose-400 ring-2 ring-rose-500/30" : "border-neutral-800 hover:border-neutral-600"}`}
          >
            {session.user?.profilePic ? (
              <img src={session.user.profilePic} alt="" className="h-full w-full object-cover" />
            ) : (
              <UserRound className="h-4 w-4 text-neutral-400" />
            )}
          </Link>

          <button
            type="button"
            onClick={() => signOut()}
            className="ml-1 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-white/[0.04] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
      </header>

      <nav
        aria-label="Mobile navigation"
        className="lov-mobile-nav fixed inset-x-0 bottom-0 z-[70] flex border-t border-neutral-800/90 bg-neutral-950/95 px-2 pt-1.5 pb-[calc(0.35rem_+_env(safe-area-inset-bottom))] shadow-[0_-12px_40px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl md:hidden"
      >
        <NavLink href="/" icon={House} label="Home" active={isHome} mobile />
        <NavLink href="/direct/inbox" icon={MessageCircle} label="Messages" active={isMessages} mobile />
        <NavLink href={profileHref} icon={UserRound} label="Profile" active={isProfile} mobile />
        <NavLink href="/dating/discover" icon={Heart} label="Dating" active={isDating} mobile />
      </nav>
    </>
  );
}
