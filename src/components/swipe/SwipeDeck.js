"use client"
import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import SwipeCard from "./SwipeCard";
import ActionBar from "./ActionBar";
import MatchModal from "./MatchModal";

export const SwipeDeck = ({ currentUserAvatar }) => {

  const [stack, setStack] = useState([]);
  const [history, setHistory] = useState([]); // [{profile, dir}]
  const [exitingId, setExitingId] = useState(null);
  const [exitingDir, setExitingDir] = useState(null);
  const [match, setMatch] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(()=>{
    const fetchData = async()=>{
      const res = await fetch('/api/swipe',{
        method:'GET'
      })
      const data = await res.json();
      setStack(Array.isArray(data?.swipes) ? data.swipes : []);
    }
    fetchData();
  },[])
  
  const top = Array.isArray(stack) && stack.length > 0 ? stack[0] : null;

  const postSwipe = async (toUser, route) => {
    const res = await fetch(`/api/swipe/${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ toUser }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || data.message || "Swipe request failed.");
    }

    return res.json();
  };

  const commitSwipe = useCallback(
    async (dir) => {
      if (!top || exitingId) return;
      setExitingId(top._id);
      setExitingDir(dir);

      const route = dir === "nope" ? "pass" : dir === "like" ? "like" : null;
      const payload = route ? postSwipe(top._id, route) : Promise.resolve(null);

      try {
        await payload;
      } catch (error) {
        console.error("Swipe API error:", error);
      }

      setTimeout(() => {
        setStack((s) => s.slice(1));
        setHistory((h) => [...h, { profile: top, dir }]);
        setExitingId(null);
        setExitingDir(null);
        if (dir === "like" || dir === "super") {
          const threshold = dir === "super" ? 70 : 88;
          if (top.matchPercent >= threshold) {
            setMatch(top);
          }
        }
      }, 280);
    },
    [top, exitingId],
  );

  const handleRewind = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setStack((s) => [last.profile, ...s]);
  };

  const handleBoost = () => {
    // small celebration — no-op for now, could trigger toast
  };

  const refreshProfiles = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("/api/swipe");
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Could not refresh profiles.");
      setStack(Array.isArray(data?.swipes) ? data.swipes : []);
    } catch (error) {
      console.error("Profile refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const visible = Array.isArray(stack) ? stack.slice(0, 3) : [];

  return (
    <div className="flex w-full flex-col items-center" data-testid="swipe-deck">
      <div className="relative aspect-[3/4.4] w-full max-w-sm">
        {visible.length === 0 ? (
          <EmptyState onRefresh={refreshProfiles} refreshing={refreshing} />
        ) : (
          <AnimatePresence initial={false}>
            {visible
              .slice()
              .reverse() // render bottom cards first so top card paints last
              .map((p) => {
                const idx = visible.findIndex((v) => v._id === p._id);
                const isTop = idx === 0;
                return (
                  <SwipeCard
                    key={p._id}
                    profile={p}
                    isTop={isTop}
                    index={idx}
                    onSwipe={commitSwipe}
                    controlledDir={exitingId === p._id ? exitingDir : null}
                  />
                );
              })}
          </AnimatePresence>
        )}
      </div>

      <ActionBar
        canRewind={history.length > 0}
        onRewind={handleRewind}
        onPass={() => commitSwipe("nope")}
        onSuper={() => commitSwipe("super")}
        onLike={() => commitSwipe("like")}
        onBoost={handleBoost}
      />

      <MatchModal
        match={match}
        currentUserAvatar={currentUserAvatar}
        onClose={() => setMatch(null)}
        onMessage={() => setMatch(null)}
      />
    </div>
  );
};

const EmptyState = ({ onRefresh, refreshing }) => (
  <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-white/[0.08] bg-[radial-gradient(circle_at_50%_15%,rgba(255,45,120,0.09),transparent_44%),rgba(10,10,10,0.86)] p-8 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/[0.08] text-rose-300 shadow-[0_0_35px_-12px_rgba(255,45,120,0.35)]">
      <Heart className="h-6 w-6 fill-rose-400/80 text-rose-300" />
    </div>
    <h3 className="text-2xl font-semibold tracking-tight text-neutral-100">Your deck is clear for now.</h3>
    <p className="mt-2 max-w-[30ch] text-sm leading-6 text-neutral-400">
      You met everyone in your deck. Check back later to see who is new around you.
    </p>
    <button
      type="button"
      onClick={onRefresh}
      disabled={refreshing}
      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-rose-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:cursor-wait disabled:opacity-70"
      data-testid="reset-deck-btn"
    >
      <Sparkles className="h-4 w-4" />
      {refreshing ? "Checking..." : "Check for new people"}
    </button>
  </div>
);
export default SwipeDeck;
