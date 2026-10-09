"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import SwipeDeck from "@/components/swipe/SwipeDeck";
import LikesYou from "@/components/swipe/LikesYou";
import YouLiked from "@/components/swipe/YouLiked";
import MatchesPage from "@/components/swipe/matches";
import { Heart, HeartHandshake, Send, Sparkles } from "lucide-react";

const TABS = [
  { id: "discover", label: "Discover", icon: Sparkles },
  { id: "likes", label: "Likes you", icon: Heart },
  { id: "liked", label: "You liked", icon: Send },
  { id: "matches", label: "Matches", icon: HeartHandshake },
];

const TAB_COPY = {
  discover: "A few thoughtful swipes can turn into a really good story.",
  likes: "See who’s already hoping you’ll say hello.",
  liked: "Keep track of the people who caught your eye.",
  matches: "The feeling is mutual. Your conversations start here.",
};

export default function DiscoverPage() {
  const [activeTab, setActiveTab] = useState("discover");
  const { adminUser, loading } = useUser();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100">
      <main className="relative isolate min-h-[calc(100vh-65px)] overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-48 top-16 h-96 w-96 rounded-full bg-rose-500/[0.07] blur-[110px]" />
          <div className="absolute -right-44 top-[28rem] h-[30rem] w-[30rem] rounded-full bg-fuchsia-500/[0.045] blur-[130px]" />
          <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-rose-950/[0.12] to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-9 sm:px-6 sm:pt-12 lg:px-8">
          <header className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-rose-400/15 bg-rose-500/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-200">
              <Heart className="h-3.5 w-3.5 fill-rose-400 text-rose-400" />
              Lov dating
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.045em] text-white sm:text-5xl">
              Meet someone <span className="text-rose-300">worth the hello.</span>
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-400 sm:text-base">
              Real people, shared interests, and a little room for a spark.
            </p>
          </header>

          <nav
            aria-label="Dating sections"
            role="tablist"
            className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-1 rounded-2xl border border-white/[0.07] bg-neutral-950/75 p-1.5 shadow-[0_16px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:grid-cols-4"
          >
            {TABS.map(({ id, label, icon: Icon }) => {
              const selected = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTab(id)}
                  className={`group flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/70 ${
                    selected
                      ? "bg-rose-500 text-white shadow-[0_8px_24px_-12px_rgba(255,45,120,0.9)]"
                      : "text-neutral-400 hover:bg-white/[0.045] hover:text-white"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${selected ? "" : "text-neutral-500 group-hover:text-rose-300"}`} />
                  {label}
                </button>
              );
            })}
          </nav>

          <div className="mx-auto mt-7 flex max-w-5xl flex-col items-center justify-between gap-3 px-1 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                {TABS.find((tab) => tab.id === activeTab)?.label}
              </h2>
              <p className="mt-1 text-sm text-neutral-500">{TAB_COPY[activeTab]}</p>
            </div>
            {!loading && adminUser?.isDatingEnabled && (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] bg-white/[0.025] px-3 py-1.5 text-xs text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_9px_rgba(52,211,153,0.8)]" />
                Your dating profile is active
              </div>
            )}
          </div>

          <section className="mx-auto mt-5 max-w-5xl" role="tabpanel">
            {loading ? (
              <div className="mx-auto flex min-h-72 max-w-md flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-neutral-950/50 p-8 text-center">
                <div className="h-9 w-9 animate-spin rounded-full border-2 border-rose-400/20 border-t-rose-400" />
                <p className="mt-4 text-sm text-neutral-400">Getting your dating space ready…</p>
              </div>
            ) : !adminUser?.isDatingEnabled ? (
              <div className="mx-auto flex min-h-72 max-w-xl flex-col items-center justify-center rounded-3xl border border-white/[0.07] bg-neutral-950/55 px-6 py-12 text-center shadow-2xl shadow-black/20">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-500/10 text-rose-300">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">Make room for a little romance</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-400">
                  Turn on dating from your profile to meet people and see who’s interested.
                </p>
              </div>
            ) : (
              <div className="rounded-[1.75rem] border border-white/[0.065] bg-neutral-950/35 p-2 shadow-[0_24px_90px_-48px_rgba(0,0,0,0.95)] sm:p-4">
                {activeTab === "discover" && <SwipeDeck currentUserAvatar={adminUser?.profilePic} />}
                {activeTab === "likes" && <LikesYou onDiscover={() => setActiveTab("discover")} />}
                {activeTab === "liked" && <YouLiked onDiscover={() => setActiveTab("discover")} />}
                {activeTab === "matches" && <MatchesPage />}
              </div>
            )}
          </section>

          <p className="mt-8 text-center text-[11px] tracking-wide text-neutral-600">
            Take your time. The best connections feel like you.
          </p>
        </div>
      </main>
    </div>
  );
}
