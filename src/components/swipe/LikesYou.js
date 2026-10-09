"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, Heart, LoaderCircle, MapPin, MessageCircle, Sparkles } from "lucide-react";

function ProfileImage({ user, className = "" }) {
  const [failed, setFailed] = useState(false);
  const displayName = user?.name || user?.username || "Someone lovely";
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  if (!user?.profilePic || failed) {
    return (
      <div className={`flex items-center justify-center bg-[radial-gradient(circle_at_25%_20%,rgba(255,120,160,0.32),transparent_38%),linear-gradient(145deg,#35131f,#171318_65%,#111)] ${className}`}>
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-black/15 text-2xl font-semibold tracking-wide text-rose-100/90 shadow-xl backdrop-blur-sm">
          {initials || <Heart className="h-8 w-8 fill-rose-300/80 text-rose-300/80" />}
        </span>
      </div>
    );
  }

  return (
    <img
      src={user.profilePic}
      alt={displayName}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

function LoadingCard() {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/[0.07] bg-neutral-900/70">
      <div className="aspect-[4/4.6] animate-pulse bg-neutral-800/80" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-1/2 animate-pulse rounded bg-neutral-800" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-neutral-800/80" />
        <div className="flex gap-2 pt-2">
          <div className="h-10 flex-1 animate-pulse rounded-xl bg-neutral-800" />
          <div className="h-10 w-12 animate-pulse rounded-xl bg-neutral-800/70" />
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onDiscover }) {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center px-5 py-12 text-center">
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.08] text-rose-300">
        <Heart className="h-7 w-7" />
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-950 bg-rose-400 text-[10px] text-white">0</span>
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">Your admirers will show up here</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
        Keep your profile feeling like you and give discovery a little time. New likes will be waiting right here.
      </p>
      <button
        type="button"
        onClick={onDiscover}
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-950/30 transition hover:bg-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
      >
        Explore people <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function LikesYou({ onDiscover }) {
  const [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const [pendingId, setPendingId] = useState(null);
  const [notice, setNotice] = useState("");

  const fetchLikes = useCallback(async (signal) => {
    try {
      const response = await fetch("/api/dating/liked-you", { signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not load likes right now.");
      setLikes(Array.isArray(data?.likes) ? data.likes : []);
      setLoadError("");
    } catch (error) {
      if (error.name !== "AbortError") setLoadError(error.message || "Could not load likes right now.");
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchLikes(controller.signal);
    return () => controller.abort();
  }, [fetchLikes]);

  const respondToLike = async (like, action) => {
    const user = like?.fromUser;
    if (!user?._id || pendingId) return;

    setPendingId(like._id);
    setActionError("");
    setNotice("");
    try {
      const response = await fetch(`/api/swipe/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toUser: user._id }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || data?.message || "That didn’t go through. Try again.");
      setLikes((current) => current.filter((item) => item._id !== like._id));
      setNotice(action === "like" ? (data?.matched ? "It’s mutual — you have a new match." : "Like sent. Fingers crossed.") : "Passed for now.");
    } catch (error) {
      setActionError(error.message || "That didn’t go through. Try again.");
    } finally {
      setPendingId(null);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 p-2 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((item) => <LoadingCard key={item} />)}
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
        <p className="text-sm text-rose-200">{loadError}</p>
        <button type="button" onClick={() => { setLoading(true); fetchLikes(); }} className="mt-4 rounded-xl border border-white/10 px-4 py-2 text-sm text-neutral-200 transition hover:bg-white/[0.05]">Try again</button>
      </div>
    );
  }

  if (likes.length === 0) return <EmptyState onDiscover={onDiscover} />;

  return (
    <div className="p-1 sm:p-2">
      <div className="mb-4 flex flex-col gap-2 border-b border-white/[0.06] px-2 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-neutral-300">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-500/10 text-rose-300"><Heart className="h-3.5 w-3.5 fill-current" /></span>
          <span><strong className="font-semibold text-white">{likes.length}</strong> {likes.length === 1 ? "person likes" : "people like"} you</span>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500"><Sparkles className="h-3.5 w-3.5 text-rose-300/80" /> Your next conversation could start here</span>
      </div>

      {notice && <p role="status" className="mb-4 rounded-xl border border-rose-400/15 bg-rose-500/[0.07] px-4 py-3 text-sm text-rose-100">{notice}</p>}
      {actionError && <p role="alert" className="mb-4 rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3 text-sm text-red-200">{actionError}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {likes.map((like) => {
          const user = like?.fromUser;
          const name = user?.name || user?.username || "Someone lovely";
          const isPending = pendingId === like._id;
          return (
            <article key={like._id} className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111112] shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)] transition duration-300 hover:-translate-y-1 hover:border-rose-300/20 hover:shadow-[0_24px_60px_-38px_rgba(255,45,120,0.25)]">
              <div className="relative aspect-[4/4.6] overflow-hidden bg-neutral-900">
                <ProfileImage user={user} className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
                <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                  <Heart className="h-3 w-3 fill-rose-400 text-rose-400" /> Likes you
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4">
                  <div className="flex items-center gap-1.5">
                    <h3 className="truncate text-xl font-semibold tracking-tight text-white">{name}{user?.age ? `, ${user.age}` : ""}</h3>
                    {user?.isVerified && <BadgeCheck className="h-4 w-4 shrink-0 text-sky-300" />}
                  </div>
                  {user?.location && <p className="mt-1 flex items-center gap-1 text-xs text-white/70"><MapPin className="h-3 w-3" />{user.location}</p>}
                  {user?.bio && <p className="mt-2 line-clamp-2 text-sm leading-5 text-white/75">{user.bio}</p>}
                </div>
              </div>
              <div className="flex gap-2 p-3">
                <button
                  type="button"
                  disabled={Boolean(pendingId)}
                  onClick={() => respondToLike(like, "like")}
                  className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-rose-500 px-3 text-sm font-semibold text-white shadow-lg shadow-rose-950/25 transition hover:bg-rose-400 disabled:cursor-wait disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300"
                >
                  {isPending ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                  Like back
                </button>
                <button
                  type="button"
                  disabled={Boolean(pendingId)}
                  aria-label={`Pass on ${name}`}
                  onClick={() => respondToLike(like, "pass")}
                  className="flex min-h-11 w-12 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.025] text-neutral-400 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white disabled:cursor-wait disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                >
                  <span className="sr-only">Pass</span>
                  <span aria-hidden="true" className="text-xl leading-none">×</span>
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
