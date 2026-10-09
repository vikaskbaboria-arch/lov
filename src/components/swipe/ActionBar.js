"use client"
import React from "react";
import { RotateCcw, X, Star, Heart, Zap } from "lucide-react";

const Btn = ({ children, onClick, size = "md", tone = "neutral", testId, label }) => {
  const sizes = {
    sm: "h-9 w-9 sm:h-12 sm:w-12",
    md: "h-11 w-11 sm:h-14 sm:w-14",
    lg: "h-12 w-12 sm:h-16 sm:w-16",
  };
  const tones = {
    neutral: "border-neutral-800 bg-neutral-950/80 text-neutral-300 hover:text-white",
    rose: "border-rose-400/30 bg-neutral-950/80 text-rose-400 hover:border-rose-400/60",
    emerald: "border-emerald-400/30 bg-neutral-950/80 text-emerald-400 hover:border-emerald-400/60",
    sky: "border-sky-400/30 bg-neutral-950/80 text-sky-300 hover:border-sky-400/60",
    amber: "border-amber-400/30 bg-neutral-950/80 text-amber-300 hover:border-amber-400/60",
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-testid={testId}
      className={`flex ${sizes[size]} items-center justify-center rounded-full border backdrop-blur transition-all active:scale-90 ${tones[tone]}`}
    >
      {children}
    </button>
  );
};

export const ActionBar = ({ onRewind, onPass, onSuper, onLike, onBoost, canRewind }) => {
  return (
    <div
      className="mt-4 flex w-full items-center justify-center gap-2 sm:gap-4"
      data-testid="action-bar"
    >
      <Btn size="sm" onClick={onRewind} testId="btn-rewind" label="Rewind">
        <RotateCcw className={`h-5 w-5 ${canRewind ? "" : "opacity-40"}`} />
      </Btn>
      <Btn size="md" tone="neutral" onClick={onPass} testId="btn-pass" label="Pass">
        <X className="h-7 w-7" strokeWidth={2.5} />
      </Btn>
      <Btn size="md" tone="sky" onClick={onSuper} testId="btn-super" label="Super like">
        <Star className="h-6 w-6" />
      </Btn>
      <Btn size="lg" tone="rose" onClick={onLike} testId="btn-like" label="Like">
        <Heart className="h-7 w-7" />
      </Btn>
      <Btn size="sm" tone="amber" onClick={onBoost} testId="btn-boost" label="Boost">
        <Zap className="h-5 w-5" />
      </Btn>
    </div>
  );
};

export default ActionBar;
