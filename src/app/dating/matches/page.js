"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, MessageCircle, User, Sparkles, MapPin, Clock,
  Wifi, Star, Shield, ChevronRight, Heart, Zap, Filter,
  Bell, Settings, X, Eye
} from "lucide-react";
import Navar from "@/components/navbar";
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
    <div className="skeleton-card">
      <div className="sk-img" />
      <div className="sk-body">
        <div className="sk-line w70" />
        <div className="sk-line w90 thin" />
        <div className="sk-line w50 thin" />
        <div className="sk-tags">
          <div className="sk-tag" /><div className="sk-tag" /><div className="sk-tag" />
        </div>
        <div className="sk-btns">
          <div className="sk-btn" /><div className="sk-btn" />
        </div>
      </div>
    </div>
  );
}

function AnonAvatar({ size = 200 }) {
  return (
    <div className="anon-avatar" style={{ width: size, height: size }}>
      <div className="anon-ring" />
      <div className="anon-inner">
        <Shield size={size * 0.28} color="#10b981" opacity={0.8} />
      </div>
      <div className="anon-pulse" />
    </div>
  );
}

function MatchCard({ match, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`match-card ${hovered ? "hovered" : ""}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
    >
      <div className="card-img-wrap">
        {match.isAnon ? (
          <div className="card-img anon-bg"><AnonAvatar size={180} /></div>
        ) : (
          <motion.div
            className="card-img"
            style={{ backgroundImage: `url(${match.img})` }}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.5 }}
          />
        )}
        <div className="img-overlay" />
        <div className="card-badges-top">
          {match.isNew && (
            <span className="badge badge-new"><Sparkles size={10} /> New</span>
          )}
          {match.isAnon && (
            <span className="badge badge-anon"><Shield size={10} /> Anonymous</span>
          )}
        </div>
        <div className="match-pct">
          <Zap size={11} fill="#10b981" color="#10b981" />
          {match.matchPct}%
        </div>
        {match.online && <span className="online-dot" />}
      </div>

      <div className="card-body">
        <div className="card-name-row">
          <div>
            <h3 className="card-name">{match.name}{match.age ? `, ${match.age}` : ""}</h3>
            <div className="card-active">
              <Clock size={11} />
              <span>{match.lastActive}</span>
              {match.isNearby && <><MapPin size={11} /><span>Nearby</span></>}
            </div>
          </div>
        </div>

        <p className="card-bio">{match.bio}</p>

        <div className="card-tags">
          {match.tags.map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        <div className="card-actions">
          <button className="btn btn-msg">
            <MessageCircle size={15} />
            Message
          </button>
          <button className="btn btn-view">
            <Eye size={15} />
            View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function NewMatchBubble({ match }) {
  return (
    <motion.div
      className="bubble-wrap"
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bubble-img-wrap">
        {match.isAnon ? (
          <div className="bubble-img anon-mini"><Shield size={22} color="#10b981" /></div>
        ) : (
          <div className="bubble-img" style={{ backgroundImage: `url(${match.img})` }} />
        )}
        {match.online && <span className="bubble-online" />}
        <div className="bubble-pct">{match.matchPct}%</div>
      </div>
      <p className="bubble-name">{match.isAnon ? "???" : match.name.split(" ")[0]}</p>
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box;  }

        body, #root { background: #050508; min-height: 100vh; font-family: 'DM Sans', sans-serif; color: #f0f0f0; }

        .blob {
          position: fixed; border-radius: 50%; filter: blur(120px);
          pointer-events: none; z-index: 0;
        }
        .blob1 { width: 600px; height: 600px; background: rgba(16,185,129,0.07); top: -200px; left: -100px; animation: drift1 18s ease-in-out infinite; }
        .blob2 { width: 500px; height: 500px; background: rgba(16,185,129,0.05); bottom: 100px; right: -150px; animation: drift2 22s ease-in-out infinite; }
        .blob3 { width: 350px; height: 350px; background: rgba(52,211,153,0.04); top: 50%; left: 50%; transform: translate(-50%,-50%); animation: drift3 15s ease-in-out infinite; }
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(60px,40px) scale(1.1)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-50px,30px)} }
        @keyframes drift3 { 0%,100%{transform:translate(-50%,-50%) scale(1)} 50%{transform:translate(-50%,-50%) scale(1.2)} }

        .navbar {
          position: sticky; top: 0; z-index: 100;
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          background: rgba(5,5,8,0.82); border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0 24px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .nav-logo { font-family: 'Bricolage Grotesque', sans-serif; font-size: 20px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
        .nav-logo span { color: #10b981; }
        .nav-right { display: flex; gap: 8px; align-items: center; }
        .nav-icon { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s; color: #aaa; }
        .nav-icon:hover { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.3); color: #10b981; }
        .nav-avatar { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,#10b981,#34d399); border: 2px solid rgba(16,185,129,0.5); cursor: pointer; overflow: hidden; background-image: url('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80'); background-size: cover; }

        .page { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; padding: 48px 24px 80px; }

        .hero { margin-bottom: 36px; }
        .hero-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #10b981; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.2); border-radius: 100px; padding: 4px 12px; margin-bottom: 16px; letter-spacing: 0.5px; text-transform: uppercase; font-weight: 500; }
        .hero-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: clamp(36px,6vw,62px); font-weight: 700; color: #fff; letter-spacing: -2px; line-height: 1.05; margin-bottom: 12px; }
        .hero-title span { color: #10b981; }
        .hero-sub { font-size: 16px; color: rgba(255,255,255,0.45); font-weight: 300; }

        .search-wrap { position: relative; margin-bottom: 24px; }
        .search-input {
          width: 100%; height: 52px; padding: 0 20px 0 50px;
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px; color: #fff;
          font-family: 'DM Sans', sans-serif; font-size: 15px;
          outline: none; transition: all 0.3s;
        }
        .search-input::placeholder { color: rgba(255,255,255,0.25); }
        .search-input:focus { border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.04); box-shadow: 0 0 0 4px rgba(16,185,129,0.07); }
        .search-icon { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); pointer-events: none; }
        .search-clear { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: rgba(255,255,255,0.3); cursor: pointer; transition: color 0.2s; }
        .search-clear:hover { color: #10b981; }

        .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 40px; }
        .chip {
          padding: 8px 18px; border-radius: 100px; font-size: 13px; font-weight: 500;
          cursor: pointer; transition: all 0.25s; border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }
        .chip:hover { border-color: rgba(16,185,129,0.3); color: rgba(255,255,255,0.8); }
        .chip.active { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.4); color: #10b981; }

        .section-label { font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.3); font-weight: 500; margin-bottom: 20px; display: flex; align-items: center; gap: 8px; }
        .section-label::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.06); }

        .new-scroll { display: flex; gap: 16px; overflow-x: auto; padding-bottom: 8px; margin-bottom: 48px; scrollbar-width: none; }
        .new-scroll::-webkit-scrollbar { display: none; }

        .bubble-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; cursor: pointer; flex-shrink: 0; }
        .bubble-img-wrap { position: relative; }
        .bubble-img { width: 72px; height: 72px; border-radius: 50%; background-size: cover; background-position: center; border: 2px solid rgba(16,185,129,0.4); transition: border-color 0.2s; }
        .bubble-img.anon-mini { display: flex; align-items: center; justify-content: center; background: rgba(16,185,129,0.08); }
        .bubble-online { position: absolute; bottom: 2px; right: 2px; width: 12px; height: 12px; border-radius: 50%; background: #10b981; border: 2px solid #050508; }
        .bubble-pct { position: absolute; top: -4px; right: -8px; background: rgba(16,185,129,0.9); color: #fff; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 100px; }
        .bubble-name { font-size: 12px; color: rgba(255,255,255,0.6); font-weight: 400; }

        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

        .match-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 24px; overflow: hidden;
          transition: border-color 0.35s, box-shadow 0.35s;
          cursor: pointer;
        }
        .match-card.hovered {
          border-color: rgba(16,185,129,0.25);
          box-shadow: 0 0 40px rgba(16,185,129,0.08), 0 20px 60px rgba(0,0,0,0.4);
        }

        .card-img-wrap { position: relative; height: 240px; overflow: hidden; }
        .card-img { width: 100%; height: 100%; background-size: cover; background-position: center; transition: transform 0.5s ease; }
        .anon-bg { background: linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,5,8,0.95)); display: flex; align-items: center; justify-content: center; }
        .img-overlay { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(5,5,8,0.95) 100%); }

        .card-badges-top { position: absolute; top: 12px; left: 12px; display: flex; gap: 6px; z-index: 2; }
        .badge { display: inline-flex; align-items: center; gap: 4px; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 100px; }
        .badge-new { background: rgba(16,185,129,0.9); color: #fff; }
        .badge-anon { background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); color: rgba(255,255,255,0.85); border: 1px solid rgba(255,255,255,0.15); }
        .match-pct { position: absolute; top: 12px; right: 12px; z-index: 2; display: inline-flex; align-items: center; gap: 4px; background: rgba(5,5,8,0.75); backdrop-filter: blur(12px); border: 1px solid rgba(16,185,129,0.3); color: #10b981; font-size: 13px; font-weight: 700; padding: 5px 10px; border-radius: 100px; }
        .online-dot { position: absolute; bottom: 14px; left: 14px; z-index: 2; width: 10px; height: 10px; border-radius: 50%; background: #10b981; border: 2px solid #050508; box-shadow: 0 0 8px rgba(16,185,129,0.8); }

        .card-body { padding: 16px 18px 20px; }
        .card-name-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .card-name { font-family: 'Bricolage Grotesque', sans-serif; font-size: 18px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
        .card-active { display: flex; align-items: center; gap: 4px; font-size: 11px; color: rgba(255,255,255,0.35); margin-top: 3px; flex-wrap: wrap; }
        .card-bio { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.55; margin-bottom: 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .card-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 16px; }
        .tag { font-size: 11px; color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 4px 10px; }
        .card-actions { display: flex; gap: 8px; }
        .btn { flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px; padding: 10px; border-radius: 12px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.25s; font-family: 'DM Sans', sans-serif; }
        .btn-msg { background: rgba(16,185,129,0.12); color: #10b981; border: 1px solid rgba(16,185,129,0.25); }
        .btn-msg:hover { background: rgba(16,185,129,0.2); box-shadow: 0 0 20px rgba(16,185,129,0.15); }
        .btn-view { background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.6); border: 1px solid rgba(255,255,255,0.08); }
        .btn-view:hover { background: rgba(255,255,255,0.08); color: #fff; }

        .skeleton-card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.06); border-radius: 24px; overflow: hidden; animation: shimmer 1.8s ease-in-out infinite; }
        @keyframes shimmer { 0%,100%{opacity:0.4} 50%{opacity:0.7} }
        .sk-img { height: 240px; background: rgba(255,255,255,0.04); }
        .sk-body { padding: 16px 18px 20px; }
        .sk-line { height: 14px; background: rgba(255,255,255,0.06); border-radius: 8px; margin-bottom: 10px; }
        .sk-line.w70 { width: 70%; height: 18px; }
        .sk-line.w90 { width: 90%; }
        .sk-line.w50 { width: 50%; }
        .sk-line.thin { height: 10px; }
        .sk-tags { display: flex; gap: 6px; margin: 14px 0; }
        .sk-tag { height: 24px; width: 64px; background: rgba(255,255,255,0.05); border-radius: 100px; }
        .sk-btns { display: flex; gap: 8px; margin-top: 4px; }
        .sk-btn { flex: 1; height: 38px; background: rgba(255,255,255,0.05); border-radius: 12px; }

        .empty-state { text-align: center; padding: 80px 24px; }
        .empty-icon { width: 80px; height: 80px; border-radius: 50%; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.15); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; }
        .empty-title { font-family: 'Bricolage Grotesque', sans-serif; font-size: 22px; font-weight: 600; color: #fff; margin-bottom: 10px; }
        .empty-sub { font-size: 14px; color: rgba(255,255,255,0.35); max-width: 280px; margin: 0 auto 24px; line-height: 1.6; }
        .empty-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); color: #10b981; border-radius: 12px; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.25s; }
        .empty-btn:hover { background: rgba(16,185,129,0.18); }

        .anon-avatar { position: relative; display: flex; align-items: center; justify-content: center; }
        .anon-ring { position: absolute; inset: 0; border-radius: 50%; border: 2px dashed rgba(16,185,129,0.3); animation: spin 12s linear infinite; }
        .anon-inner { position: relative; z-index: 1; }
        .anon-pulse { position: absolute; inset: 10%; border-radius: 50%; background: rgba(16,185,129,0.06); animation: pulse 2.5s ease-in-out infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.15);opacity:1} }

        @media (max-width: 600px) {
          .page { padding: 32px 16px 64px; }
          .grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .card-img-wrap { height: 180px; }
          .card-name { font-size: 15px; }
          .btn { padding: 8px 6px; font-size: 12px; }
        }
        @media (max-width: 400px) {
          .grid { grid-template-columns: 1fr; }
        }
      `}</style>
<Navar/>
      <div className="blob blob1" />
      <div className="blob blob2" />
      <div className="blob blob3" />

     

      <main className="page">
        <motion.div
          className="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="hero-tag"><Sparkles size={12} /> Connections</div>
          <h1 className="hero-title">Your <span>Matches</span></h1>
          <p className="hero-sub">People who matched your vibe.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="search-wrap">
            <Search size={16} className="search-icon" />
            <input
              className="search-input"
              placeholder="Search by name, vibe, interests…"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
            {query && <X size={15} className="search-clear" onClick={() => setQuery("")} />}
          </div>

          <div className="filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`chip ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >{f}</button>
            ))}
          </div>
        </motion.div>

        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
            <p className="section-label"><Sparkles size={11} /> New Matches</p>
            <div className="new-scroll">
              {NEW_MATCHES.map(m => <NewMatchBubble key={m.id} match={m} />)}
            </div>
          </motion.div>
        )}

        <p className="section-label" style={{ marginBottom: 24 }}>
          <Heart size={11} /> {filter === "All" ? "All Matches" : filter}
        </p>

        {loading ? (
          <div className="grid">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon"><Search size={28} color="#10b981" opacity={0.6} /></div>
            <h2 className="empty-title">No matches here yet</h2>
            <p className="empty-sub">Try a different filter or broaden your search — your person is out there.</p>
            <button className="empty-btn" onClick={() => { setFilter("All"); setQuery(""); }}>
              <Sparkles size={15} /> Explore All Matches
            </button>
          </div>
        ) : (
          <div className="grid">
            <AnimatePresence>
              {filtered.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)}
            </AnimatePresence>
          </div>
        )}
      </main>
    </>
  );
}
