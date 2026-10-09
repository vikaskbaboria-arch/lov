"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MessageCircle, Sparkles, MapPin, Clock,
  Shield, Heart, Zap, X, Eye
} from "lucide-react";

const FILTERS = ["All", "New", "Online", "Nearby", "Anonymous"];

const MATCHES = [
  {
    id: 1, name: "Aria Chen", age: 24, matchPct: 97,
    bio: "Chasing sunsets and deep conversations. Lover of abstract art and late-night philosophy.",
    tags: ["Philosophy", "Art", "Sunsets", "Coffee"],
    online: true, isNew: true, isAnon: false, isNearby: true,
    lastActive: "Active now",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&q=80"
  },
  {
    id: 2, name: "Milo Park", age: 26, matchPct: 93,
    bio: "Indie music producer by day, rooftop wanderer by night. ENFP energy always.",
    tags: ["Music", "Night Owl", "ENFP", "Rooftops"],
    online: true, isNew: true, isAnon: false, isNearby: false,
    lastActive: "Active now",
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
  },
  {
    id: 3, name: "Anonymous", age: null, matchPct: 89,
    bio: "Sometimes the mystery is the message. Meet me at the edge of curiosity.",
    tags: ["Mystery", "Deep Talks", "INTJ"],
    online: false, isNew: false, isAnon: true, isNearby: false,
    lastActive: "3h ago",
    img: null
  },
  {
    id: 4, name: "Sofia Reyes", age: 23, matchPct: 91,
    bio: "Poet who codes, coder who writes poetry. Looking for someone to co-create with.",
    tags: ["Poetry", "Code", "Minimalism", "Jazz"],
    online: true, isNew: false, isAnon: false, isNearby: true,
    lastActive: "Active now",
    img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&q=80"
  },
  {
    id: 5, name: "Kai Nakamura", age: 27, matchPct: 88,
    bio: "Architect of spaces and feelings. I believe every room has an emotion waiting inside.",
    tags: ["Architecture", "Emotions", "Film", "Matcha"],
    online: false, isNew: false, isAnon: false, isNearby: true,
    lastActive: "1d ago",
    img: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=400&q=80"
  },
  {
    id: 6, name: "Zara Osei", age: 25, matchPct: 95,
    bio: "Afrofuturist. Tells stories through textiles and digital worlds. Vibe-checker certified.",
    tags: ["Design", "Afrofuturism", "Fashion", "Stories"],
    online: true, isNew: true, isAnon: false, isNearby: false,
    lastActive: "Active now",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
  },
];

const NEW_MATCHES = MATCHES.filter(m => m.isNew || m.matchPct > 90).slice(0, 5);

function SkeletonCard() {
  return (
    <div className="lov-card animate-pulse">
      <div className="h-60 bg-neutral-800/60" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-2/3 rounded bg-neutral-800/60" />
        <div className="h-3 w-full rounded bg-neutral-800/40" />
        <div className="h-3 w-1/2 rounded bg-neutral-800/40" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-neutral-800/40" />
          <div className="h-6 w-16 rounded-full bg-neutral-800/40" />
        </div>
        <div className="flex gap-2 pt-1">
          <div className="h-9 flex-1 rounded-xl bg-neutral-800/40" />
          <div className="h-9 flex-1 rounded-xl bg-neutral-800/40" />
        </div>
      </div>
    </div>
  );
}

function AnonAvatar({ size = 200 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-red-500/30 animate-[spin_12s_linear_infinite]" />
      <div className="absolute inset-[10%] rounded-full bg-red-500/10 animate-pulse" />
      <Shield size={size * 0.28} className="relative z-10 text-red-400/80" />
    </div>
  );
}

function MatchCard({ match, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`lov-card cursor-pointer ${hovered ? "border-red-500/30 shadow-[0_0_40px_rgba(255,45,120,0.08)]" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      <div className="relative h-60 overflow-hidden">
        {match.isAnon ? (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-red-500/10 to-neutral-950">
            <AnonAvatar size={180} />
          </div>
        ) : (
          <motion.div
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${match.img})` }}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-40% to-neutral-950/95" />

        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          {match.isNew && (
            <span className="inline-flex items-center gap-1 rounded-full colorred px-2.5 py-1 text-[11px] font-semibold text-white">
              <Sparkles size={10} /> New
            </span>
          )}
          {match.isAnon && (
            <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] text-neutral-100 backdrop-blur">
              <Shield size={10} /> Anonymous
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full border border-red-500/30 bg-neutral-950/75 px-2.5 py-1 text-[13px] font-bold colortextred backdrop-blur">
          <Zap size={11} className="fill-red-400" /> {match.matchPct}%
        </div>

        {match.online && (
          <span className="absolute bottom-3.5 left-3.5 z-10 h-2.5 w-2.5 rounded-full border-2 border-neutral-950 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
        )}
      </div>

      <div className="p-4.5 pb-5 px-[18px] pt-4">
        <h3 className="text-[18px] font-semibold text-neutral-50 tracking-tight">
          {match.name}{match.age ? `, ${match.age}` : ""}
        </h3>
        <div className="mt-0.5 flex flex-wrap items-center gap-1 text-[11px] text-neutral-500">
          <Clock size={11} /><span>{match.lastActive}</span>
          {match.isNearby && <><MapPin size={11} className="ml-1" /><span>Nearby</span></>}
        </div>

        <p className="mt-3.5 mb-3.5 text-[13px] leading-relaxed text-neutral-400 line-clamp-2">
          {match.bio}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {match.tags.map(t => (
            <span key={t} className="lov-pill">{t}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-red-500/25 bg-red-500/20 py-2.5 text-[13px] font-medium colortextred transition hover:bg-red-500/20">
            <MessageCircle size={15} /> Message
          </button>
          <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900/60 py-2.5 text-[13px] font-medium text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-100">
            <Eye size={15} /> View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NewMatchBubble({ match }) {
  return (
    <motion.div
      className="flex flex-shrink-0 flex-col items-center gap-2 cursor-pointer"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative">
        {match.isAnon ? (
          <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-red-500/40 bg-red-500/10">
            <Shield size={22} className="text-red-600" />
          </div>
        ) : (
          <div
            className="h-[72px] w-[72px] rounded-full border-2 border-red-500/40 bg-cover bg-center"
            style={{ backgroundImage: `url(${match.img})` }}
          />
        )}
        {match.online && (
          <span className="absolute bottom-0.5 right-0.5 h-3 w-3 rounded-full border-2 border-neutral-950 bg-emerald-500" />
        )}
        <div className="absolute -top-1 -right-2 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
          {match.matchPct}%
        </div>
      </div>
      <p className="text-xs text-neutral-400">{match.isAnon ? "???" : match.name.split(" ")[0]}</p>
    </motion.div>
  );
}

export default function MatchesPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const filtered = MATCHES.filter(m => {
    const q = query.toLowerCase();
    const nameMatch = m.name.toLowerCase().includes(q) || m.bio.toLowerCase().includes(q);
    if (!nameMatch) return false;
    if (filter === "All") return true;
    if (filter === "New") return m.isNew;
    if (filter === "Online") return m.online;
    if (filter === "Nearby") return m.isNearby;
    if (filter === "Anonymous") return m.isAnon;
    return true;
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Ambient accent glow — red to match brand, not green */}
      <div className="pointer-events-none fixed -left-24 -top-48 z-0 h-[600px] w-[600px] rounded-full bg-red-500/[0.06] blur-[120px]" />
      <div className="pointer-events-none fixed -right-36 bottom-24 z-0 h-[500px] w-[500px] rounded-full bg-red-500/[0.04] blur-[120px]" />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-8 pt-8 sm:px-6 md:pb-12 md:pt-12">
        <motion.div
          className="mb-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-1 lov-pill mb-4 uppercase rounded-full tracking-wide text-2xl text-red-600 border-red-600/70 bg-red-500/20">
            Connections
          </span>
          <h1 className="lov-display mt-4 text-4xl leading-tight tracking-tight text-neutral-50 sm:text-6xl">
            Your <span className="text-red-600">Matches</span>
          </h1>
          <p className="mt-3 text-neutral-500">People who matched your vibe.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="relative mb-6">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" />
            <input
              className="lov-input h-[52px] pl-11 pr-11 text-[15px]"
              placeholder="Search by name, vibe, interests…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && (
              <X
                size={15}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-neutral-600 hover:text-red-400 transition"
                onClick={() => setQuery("")}
              />
            )}
          </div>

          <div className="mb-10 flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`lov-chip ${filter === f ? "lov-chip-active" : ""}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>
        </motion.div>

        {!loading && NEW_MATCHES.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <p className="mb-5 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <Sparkles size={11} /> New Matches
              <span className="h-px flex-1 bg-neutral-800" />
            </p>
            <div className="no-scrollbar mb-12 flex gap-4 overflow-x-auto pb-2">
              {NEW_MATCHES.map(m => <NewMatchBubble key={m.id} match={m} />)}
            </div>
          </motion.div>
        )}

        <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
          <Heart size={11} /> {filter === "All" ? "All Matches" : filter}
          <span className="h-px flex-1 bg-neutral-800" />
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-red-500/15 bg-red-500/10">
              <Search size={28} className="text-red-400/60" />
            </div>
            <h2 className="lov-display text-2xl text-neutral-50">No matches here yet</h2>
            <p className="mx-auto mt-2 mb-6 max-w-xs text-sm leading-relaxed text-neutral-500">
              Try a different filter or broaden your search — your person is out there.
            </p>
            <button
              className="lov-btn-primary mx-auto inline-flex items-center gap-2"
              onClick={() => { setFilter("All"); setQuery(""); }}
            >
              <Sparkles size={15} /> Explore All Matches
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filtered.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
