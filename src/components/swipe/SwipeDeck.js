"use client"
import React, { useCallback, useState } from "react"
import { AnimatePresence } from "framer-motion";
import SwipeCard from "./SwipeCard";
import ActionBar from "./ActionBar";
import MatchModal from "./MatchModal";
import { profiles as seed } from "./mockData";

export const SwipeDeck = ({ currentUserAvatar }) => {
  const [stack, setStack] = useState(seed);
  const [history, setHistory] = useState([]); // [{profile, dir}]
  const [exitingId, setExitingId] = useState(null);
  const [exitingDir, setExitingDir] = useState(null);
  const [match, setMatch] = useState(null);

  const top = stack[0];

  const commitSwipe = useCallback(
    (dir) => {
      if (!top || exitingId) return;
      setExitingId(top.id);
      setExitingDir(dir);
      // wait for exit animation
      setTimeout(() => {
        setStack((s) => s.slice(1));
        setHistory((h) => [...h, { profile: top, dir }]);
        setExitingId(null);
        setExitingDir(null);
        // Determine match (only for like/super, ~ likelihood weighted by matchPercent)
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

  const visible = stack.slice(0, 3);

  return (
    <div className="flex w-full flex-col items-center" data-testid="swipe-deck">
      <div className="relative aspect-[3/4.4] w-full max-w-sm">
        {visible.length === 0 ? (
          <EmptyState onReset={() => { setStack(seed); setHistory([]); }} />
        ) : (
          <AnimatePresence initial={false}>
            {visible
              .slice()
              .reverse() // render bottom cards first so top card paints last
              .map((p) => {
                const idx = visible.findIndex((v) => v.id === p.id);
                const isTop = idx === 0;
                return (
                  <SwipeCard
                    key={p.id}
                    profile={p}
                    isTop={isTop}
                    index={idx}
                    onSwipe={commitSwipe}
                    controlledDir={exitingId === p.id ? exitingDir : null}
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

const EmptyState = ({ onReset }) => (
  <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed border-neutral-800 bg-neutral-950/60 p-8 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-neutral-800">
      <span className="text-xl text-neutral-600">✦</span>
    </div>
    <h3 className="font-display text-2xl text-neutral-100">youre all caught up.</h3>
    <p className="mt-1 max-w-[28ch] text-sm text-neutral-500">
      new people drop in your area every day. check back soon, or keep practicing.
    </p>
    <button
      type="button"
      onClick={onReset}
      className="mt-6 rounded-full border border-neutral-800 bg-neutral-900 px-5 py-2 text-sm text-neutral-200 transition-colors hover:bg-neutral-800"
      data-testid="reset-deck-btn"
    >
      reload deck
    </button>
  </div>
);

export default SwipeDeck;
