"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock3, Heart, Sparkles } from "lucide-react";

function LikedProfileImage({ user, className = "" }) {
  const [failed, setFailed] = useState(false);
  const name = user?.name || user?.username || "Someone lovely";
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();

  if (!user?.profilePic || failed) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(255,120,160,0.3),transparent_38%),linear-gradient(145deg,#35131f,#171318_65%,#111)] ${className}`}>
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-black/15 text-xl font-semibold text-rose-100/90 shadow-xl backdrop-blur-sm">{initials || <Heart className="h-7 w-7 fill-rose-300/80 text-rose-300/80" />}</span>
      </div>
    );
  }

  return <img src={user.profilePic} alt={name} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

function LikedEmptyState({ onDiscover }) {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center px-5 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.08] text-rose-300"><Heart className="h-7 w-7" /></div>
      <h3 className="mt-5 text-xl font-semibold text-white">Your story starts with a first like</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">When someone catches your eye in Discover, you’ll find them here while you wait to see if the feeling is mutual.</p>
      <button type="button" onClick={onDiscover} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">
        Go to Discover <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function YouLiked({ onDiscover }) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLikes = useCallback(async (signal) => {
    try {
      const response = await fetch("/api/dating/likes", { signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not load your likes right now.");
      setLikes(Array.isArray(data?.likes) ? data.likes : []);
      setError("");
    } catch (fetchError) {
      if (fetchError.name !== "AbortError") setError(fetchError.message || "Could not load your likes right now.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchLikes(controller.signal);
    return () => controller.abort();
  }, [fetchLikes]);

  if (loading) {
    return (
      <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => (
          <div key={item} className="overflow-hidden rounded-3xl border border-white/[0.07] bg-neutral-900/70">
            <div className="aspect-[4/3] animate-pulse bg-neutral-800/80" />
            <div className="space-y-3 p-4"><div className="h-4 w-1/2 animate-pulse rounded bg-neutral-800" /><div className="h-3 w-4/5 animate-pulse rounded bg-neutral-800/80" /></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
        <p className="text-sm text-rose-200">{error}</p>
        <button type="button" onClick={() => { setLoading(true); fetchLikes(); }} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/[0.05]">Try again</button>
      </div>
    );
  }

  if (likes.length === 0) return <LikedEmptyState onDiscover={onDiscover} />;

  return (
    <div className="p-1 sm:p-2">
      <div className="mb-4 flex flex-col gap-2 border-b border-white/[0.06] px-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-300"><Heart className="h-3.5 w-3.5 fill-current" /></span>
          <span><strong className="font-semibold text-white">{likes.length}</strong> {likes.length === 1 ? "person you liked" : "people you liked"}</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500"><Sparkles className="h-3.5 w-3.5 text-rose-300/80" /> Good things take a little time</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {likes.map((like) => {
          const user = like?.toUser;
          const name = user?.name || user?.username || "Someone lovely";
          const profileHref = user?.username ? `/${user.username}` : null;
          return (
            <article key={like._id} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111112] shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)] transition duration-300 hover:-translate-y-1 hover:border-rose-300/20">
              <div className="flex items-center gap-3 p-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl ring-1 ring-white/10">
                  <LikedProfileImage user={user} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold text-white">{name}{user?.age ? `, ${user.age}` : ""}</h3>
                  {user?.username && <p className="mt-0.5 truncate text-xs text-neutral-500">@{user.username}</p>}
                </div>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rose-300/15 bg-rose-500/[0.08] text-rose-300"><Heart className="h-4 w-4 fill-current" /></span>
              </div>
              {user?.bio ? (
                <p className="line-clamp-2 min-h-11 px-4 text-sm leading-5 text-neutral-400">{user.bio}</p>
              ) : (
                <p className="flex min-h-11 items-center gap-1.5 px-4 text-sm text-neutral-500"><Sparkles className="h-3.5 w-3.5 text-rose-300/70" /> You liked their profile</p>
              )}
              <div className="mt-4 flex items-center justify-between border-t border-white/[0.06] px-4 py-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500"><Clock3 className="h-3.5 w-3.5" /> Waiting for a like back</span>
                {profileHref ? (
                  <Link href={profileHref} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/10 hover:text-rose-200">
                    View profile <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                ) : <span className="text-xs text-neutral-600">Profile</span>}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
