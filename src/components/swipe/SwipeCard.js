"use client"
import React, { useState } from "react";
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";
import { BadgeCheck, MapPin, Sparkles, Heart } from "lucide-react";

const SWIPE_THRESHOLD = 120;

export const SwipeCard = ({ profile, isTop, index, onSwipe, controlledDir }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-140, -40], [1, 0]);
  const superOpacity = useTransform(y, [-140, -40], [1, 0]);

  const [photoIdx, setPhotoIdx] = useState(0);
  const [dir, setDir] = useState(null); // visual overlay hint while dragging

  useMotionValueEvent(x, "change", (v) => {
    if (Math.abs(v) < 30) {
      if (dir !== null) setDir(null);
    } else if (v > 30 && dir !== "like") {
      setDir("like");
    } else if (v < -30 && dir !== "nope") {
      setDir("nope");
    }
  });

  useMotionValueEvent(y, "change", (v) => {
    if (v < -60 && Math.abs(x.get()) < 60 && dir !== "super") {
      setDir("super");
    }
  });

  const handleDragEnd = (_, info) => {
    const offX = info.offset.x;
    const offY = info.offset.y;
    if (offY < -SWIPE_THRESHOLD && Math.abs(offX) < SWIPE_THRESHOLD) {
      onSwipe("super");
    } else if (offX > SWIPE_THRESHOLD) {
      onSwipe("like");
    } else if (offX < -SWIPE_THRESHOLD) {
      onSwipe("nope");
    } else {
      x.set(0);
      y.set(0);
      setDir(null);
    }
  };

  // Programmatic swipe via button (controlled exit)
  const exit =
    controlledDir === "like"
      ? { x: 500, y: -40, rotate: 20, opacity: 0 }
      : controlledDir === "nope"
        ? { x: -500, y: -40, rotate: -20, opacity: 0 }
        : controlledDir === "super"
          ? { x: 0, y: -700, rotate: 0, opacity: 0 }
          : { opacity: 0 };

  const photo = profile.photos[photoIdx];
  const photoCount = profile.photos.length;

  const handlePhotoTap = (e) => {
    if (!isTop) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const rx = e.clientX - rect.left;
    if (rx < rect.width / 2) {
      setPhotoIdx((i) => Math.max(0, i - 1));
    } else {
      setPhotoIdx((i) => Math.min(photoCount - 1, i + 1));
    }
  };

  // Depth scaling for cards behind the top card
  const depth = index === 0 ? 0 : index === 1 ? 1 : 2;
  const scale = 1 - depth * 0.04;
  const translateY = depth * 12;

  return (
    <motion.div
      className="absolute inset-0 select-none"
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : translateY,
        rotate: isTop ? rotate : 0,
        scale,
        zIndex: 10 - depth,
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={controlledDir ? exit : undefined}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      data-testid={`swipe-card-${profile.id}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-900 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
        {/* Photo */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={handlePhotoTap}
          data-testid={`card-photo-${profile.id}`}
        >
          <img
            src={photo}
            alt={profile.name}
            className="h-full w-full object-cover"
            draggable={false}
          />
          {/* gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />
        </div>

        {/* Photo progress bars */}
        <div className="pointer-events-none absolute left-3 right-3 top-3 flex gap-1">
          {profile.photos.map((_, i) => (
            <div
              key={i}
              className={`h-[2.5px] flex-1 rounded-full ${
                i === photoIdx ? "bg-white" : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Match % */}
        <div className="absolute right-3 top-7 inline-flex items-center gap-1 rounded-full border border-white/15 bg-black/45 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          <Heart className="h-3 w-3 fill-rose-400 text-rose-400" />
          {profile.matchPercent}% match
        </div>

        {/* Drag direction overlays */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute left-6 top-10 rotate-[-12deg] rounded-xl border-2 border-emerald-400 px-4 py-1.5 text-2xl font-extrabold tracking-widest text-emerald-400"
        >
          LIKE
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="pointer-events-none absolute right-6 top-10 rotate-[12deg] rounded-xl border-2 border-rose-400 px-4 py-1.5 text-2xl font-extrabold tracking-widest text-rose-400"
        >
          NOPE
        </motion.div>
        <motion.div
          style={{ opacity: superOpacity }}
          className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 rounded-xl border-2 border-sky-300 px-4 py-1.5 text-2xl font-extrabold tracking-widest text-sky-300"
        >
          SUPER
        </motion.div>

        {/* Bottom content */}
        <div className="absolute inset-x-0 bottom-0 p-5 text-white">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-3xl font-semibold tracking-tight">
                  {profile.name}{" "}
                  <span className="font-sans text-2xl font-light text-white/80">
                    {profile.age}
                  </span>
                </h2>
                {profile.verified && (
                  <BadgeCheck className="h-5 w-5 text-sky-400" />
                )}
                {profile.online && (
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                )}
              </div>
              <div className="mt-1 flex items-center gap-1.5 text-[12px] text-white/70">
                <MapPin className="h-3 w-3" />
                <span>{profile.distance}</span>
                <span className="text-white/30">·</span>
                <span>{profile.college}</span>
              </div>
            </div>
          </div>

          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-white/85">
            {profile.bio}
          </p>

          {/* Prompt (first one) */}
          {profile.prompts?.[0] && (
            <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
              <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-white/55">
                <Sparkles className="h-3 w-3" />
                {profile.prompts[0].q}
              </div>
              <div className="mt-1 text-[14px] leading-snug text-white">
                {profile.prompts[0].a}
              </div>
            </div>
          )}

          {/* Interests */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.interests.slice(0, 4).map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[11px] text-white/85 backdrop-blur-sm"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
