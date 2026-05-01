"use client"
import { useState, useEffect, useCallback } from "react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CURRENT_USER = {
  id: "me",
  name: "Alex Mercer",
  handle: "@alex.mercer",
  avatar: "https://i.pravatar.cc/150?img=12",
};

const SUGGESTIONS = [
  { id: "s1", name: "Priya Nair",   handle: "@priya.n",    avatar: "https://i.pravatar.cc/150?img=47", mutuals: 4 },
  { id: "s2", name: "Jordan Cole",  handle: "@jordanc",    avatar: "https://i.pravatar.cc/150?img=53", mutuals: 7 },
  { id: "s3", name: "Lena Kovač",   handle: "@lena.k",     avatar: "https://i.pravatar.cc/150?img=32", mutuals: 2 },
  { id: "s4", name: "Rahul Singh",  handle: "@rahulsingh", avatar: "https://i.pravatar.cc/150?img=67", mutuals: 9 },
];

const NAV_ITEMS = [
  { id: "home",     label: "Home",     Icon: HomeIcon,     active: true  },
  { id: "search",   label: "Search",   Icon: SearchIcon,   active: false },
  { id: "activity", label: "Activity", Icon: HeartIcon,    active: false },
  { id: "profile",  label: "Profile",  Icon: UserIcon,     active: false },
  { id: "saved",    label: "Saved",    Icon: BookmarkIcon, active: false },
  { id: "settings", label: "Settings", Icon: SettingsIcon, active: false },
];

const INITIAL_POSTS = [
  {
    id: "p1",
    user: { id: "u1", name: "Mara Solís", handle: "@mara.solis", avatar: "https://i.pravatar.cc/150?img=5" },
    isAnonymous: false,
    timestamp: "2h ago",
    caption: "Golden hour in Barcelona never gets old. Found this little square completely by accident — the best discoveries always happen that way.",
    image: "https://picsum.photos/seed/post01/700/440",
    likes: 284, liked: false,
    comments: [
      { id: "c1", user: "Jordan Cole", text: "This is stunning! Which neighborhood?" },
      { id: "c2", user: "Priya Nair",  text: "I need to visit Barcelona ASAP 😍" },
    ],
    totalComments: 18,
  },
  {
    id: "p2",
    user: { id: "u2", name: "Sam Rivera", handle: "@sam.rv", avatar: "https://i.pravatar.cc/150?img=33" },
    isAnonymous: true,
    timestamp: "5h ago",
    caption: "Sometimes you just need to disconnect and breathe. The city can wait.",
    image: null,
    likes: 97, liked: true,
    comments: [{ id: "c3", user: "Lena Kovač", text: "Felt this deeply." }],
    totalComments: 6,
  },
  {
    id: "p3",
    user: { id: "u3", name: "Theo Baines", handle: "@theo.b", avatar: "https://i.pravatar.cc/150?img=60" },
    isAnonymous: false,
    timestamp: "8h ago",
    caption: "Early morning run through the fog. There's something meditative about moving through a world that isn't fully awake yet.",
    image: "https://picsum.photos/seed/post03/700/440",
    likes: 521, liked: false,
    comments: [
      { id: "c4", user: "Alex Mercer", text: "What time do you go out? I can never wake up early enough 😂" },
      { id: "c5", user: "Rahul Singh", text: "Fog running is on another level." },
    ],
    totalComments: 33,
  },
  {
    id: "p4",
    user: { id: "u4", name: "Nadia Osei", handle: "@nadia.osei", avatar: "https://i.pravatar.cc/150?img=44" },
    isAnonymous: false,
    timestamp: "1d ago",
    caption: "Slow Sundays and good coffee. Made a new playlist, linked in bio if you want the vibe.",
    image: "https://picsum.photos/seed/post04/700/440",
    likes: 1042, liked: false,
    comments: [
      { id: "c6", user: "Mara Solís",  text: "The playlist is incredible, been on repeat all morning." },
      { id: "c7", user: "Sam Rivera",  text: "Sunday done right ☕" },
    ],
    totalComments: 54,
  },
];

// ─── Design tokens ────────────────────────────────────────────────────────────

const C = {
  bg:          "#0c0c0e",
  surface:     "#111114",
  surface2:    "#16161a",
  border:      "#222228",
  border2:     "#2a2a32",
  textPrimary:   "#f1f5f9",
  textSecondary: "#94a3b8",
  textMuted:     "#52525b",
  textDim:       "#3f3f46",
  accent:      "#4f46e5",
  accentHov:   "#4338ca",
  accentSoft:  "#818cf8",
  red:         "#ef4444",
};

// ─── Responsive hook ──────────────────────────────────────────────────────────

function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

// ─── SVG Icons ────────────────────────────────────────────────────────────────

function HomeIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function SearchIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
}
function HeartIcon({ size = 20, filled = false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function UserIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
function BookmarkIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>;
}
function SettingsIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}
function ImageIcon({ size = 17 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>;
}
function MessageIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
}
function ShareIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>;
}
function EyeOffIcon({ size = 11 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
function PlusIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonPost() {
  const bar = (w, h = 11, mb = 0) => (
    <div style={{ width: w, height: h, borderRadius: 6, background: C.surface2, marginBottom: mb }} />
  );
  return (
    <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "18px 20px", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: C.surface2, flexShrink: 0 }} />
        <div>{bar(130, 12, 6)}{bar(90, 10)}</div>
      </div>
      {bar("85%", 12, 8)}{bar("65%", 12, 16)}
      <div style={{ width: "100%", height: 200, borderRadius: 8, background: C.surface2, marginBottom: 16 }} />
      <div style={{ display: "flex", gap: 16 }}>{bar(70)}{bar(55)}{bar(50)}</div>
    </div>
  );
}

// ─── ActionButton ─────────────────────────────────────────────────────────────

function ActionBtn({ icon, label, active = false, activeColor = C.accentSoft, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 5,
        background: hov ? C.surface2 : "transparent",
        border: "none", borderRadius: 7,
        padding: "6px 10px",
        color: active ? activeColor : hov ? C.textSecondary : C.textMuted,
        fontSize: 13, fontWeight: 500,
        cursor: "pointer",
        transition: "background 0.15s, color 0.15s, transform 0.15s",
        transform: hov ? "scale(1.05)" : "scale(1)",
        fontFamily: "inherit",
        userSelect: "none",
      }}
    >
      {icon}
      {label && <span>{label}</span>}
    </button>
  );
}

// ─── CreatePost ───────────────────────────────────────────────────────────────

function CreatePost({ onPost }) {
  const [text, setText]     = useState("");
  const [focused, setFocused] = useState(false);
  const expanded = focused || text.length > 0;

  const submit = () => {
    if (!text.trim()) return;
    onPost(text.trim());
    setText("");
    setFocused(false);
  };

  return (
    <div style={{
      background: C.surface,
      border: `1px solid ${expanded ? C.border2 : C.border}`,
      borderRadius: 12,
      padding: "15px 18px",
      marginBottom: 12,
      transition: "border-color 0.2s",
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        <img
          src={CURRENT_USER.avatar} alt=""
          style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", flexShrink: 0, marginTop: 2 }}
        />
        <div style={{ flex: 1 }}>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="What's on your mind?"
            rows={expanded ? 3 : 1}
            style={{
              width: "100%", background: "transparent",
              border: "none", outline: "none",
              color: C.textPrimary, fontSize: 14, lineHeight: "1.6",
              resize: "none", fontFamily: "inherit",
              caretColor: C.accentSoft,
            }}
          />
          {expanded && (
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginTop: 10, paddingTop: 10,
              borderTop: `1px solid ${C.border}`,
            }}>
              <button
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "none", border: "none", cursor: "pointer",
                  color: C.textMuted, fontSize: 13,
                  padding: "5px 9px", borderRadius: 7,
                  transition: "background 0.15s, color 0.15s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.surface2; e.currentTarget.style.color = C.textSecondary; }}
                onMouseLeave={e => { e.currentTarget.style.background = "none";     e.currentTarget.style.color = C.textMuted; }}
              >
                <ImageIcon /> Photo
              </button>
              <button
                onClick={submit}
                disabled={!text.trim()}
                style={{
                  background: text.trim() ? C.accent : "#1e1e28",
                  color: text.trim() ? "#fff" : C.textDim,
                  border: "none", borderRadius: 7,
                  padding: "7px 18px", fontSize: 13, fontWeight: 600,
                  cursor: text.trim() ? "pointer" : "default",
                  transition: "background 0.2s",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => { if (text.trim()) e.currentTarget.style.background = C.accentHov; }}
                onMouseLeave={e => { if (text.trim()) e.currentTarget.style.background = C.accent; }}
              >
                Post
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PostCard ─────────────────────────────────────────────────────────────────

function PostCard({ post, onLike }) {
  const [expanded, setExpanded] = useState(false);
  const [hov, setHov]           = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#131317" : C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        marginBottom: 12,
        overflow: "hidden",
        transition: "background 0.18s",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px 10px" }}>
        <img
          src={post.isAnonymous ? "https://i.pravatar.cc/150?img=70" : post.user.avatar}
          alt=""
          style={{
            width: 40, height: 40, borderRadius: "50%", objectFit: "cover", flexShrink: 0,
            filter: post.isAnonymous ? "grayscale(1) blur(3px)" : "none",
          }}
        />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>
              {post.isAnonymous ? "Anonymous" : post.user.name}
            </span>
            {post.isAnonymous && (
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 3,
                fontSize: 10, color: C.textMuted,
                background: C.surface2,
                padding: "1px 7px", borderRadius: 20,
                border: `1px solid ${C.border}`,
              }}>
                <EyeOffIcon /> hidden
              </span>
            )}
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 1 }}>
            {!post.isAnonymous && <>{post.user.handle} · </>}{post.timestamp}
          </div>
        </div>
      </div>

      {/* Caption */}
      {post.caption && (
        <div style={{ padding: "0 18px 12px", fontSize: 14, color: C.textSecondary, lineHeight: 1.65 }}>
          {post.caption}
        </div>
      )}

      {/* Image */}
      {post.image && (
        <img
          src={post.image} alt="" loading="lazy"
          style={{ width: "100%", display: "block", maxHeight: 420, objectFit: "cover" }}
        />
      )}

      {/* Actions */}
      <div style={{ padding: "10px 18px 14px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 8 }}>
          <ActionBtn
            icon={<HeartIcon size={18} filled={post.liked} />}
            label={post.likes.toLocaleString()}
            active={post.liked}
            activeColor={C.red}
            onClick={() => onLike(post.id)}
          />
          <ActionBtn icon={<MessageIcon size={18} />} label={String(post.totalComments)} />
          <ActionBtn icon={<ShareIcon size={18} />}   label="Share" />
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {(expanded ? post.comments : post.comments.slice(0, 2)).map(c => (
              <div key={c.id} style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.5 }}>
                <span style={{ color: C.textPrimary, fontWeight: 600, marginRight: 6 }}>{c.user}</span>
                {c.text}
              </div>
            ))}
            {post.totalComments > 2 && !expanded && (
              <button
                onClick={() => setExpanded(true)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: C.textMuted, fontSize: 12, textAlign: "left",
                  padding: "2px 0", fontFamily: "inherit",
                  transition: "color 0.15s",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = C.accentSoft; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; }}
              >
                View all {post.totalComments} comments
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Nav variants ─────────────────────────────────────────────────────────────

/** Full text + icon sidebar — desktop */
function NavSidebar() {
  return (
    <nav style={{ position: "sticky", top: 24 }}>
      <div style={{ paddingLeft: 12, marginBottom: 28 }}>
        <span style={{ fontSize: 19, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.03em" }}>pulse</span>
      </div>
      {NAV_ITEMS.map(({ id, label, Icon, active }) => (
        <div
          key={id}
          style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 12px", borderRadius: 9, marginBottom: 2,
            cursor: "pointer",
            background: active ? "#18181e" : "transparent",
            color: active ? C.accentSoft : C.textMuted,
            transition: "background 0.15s, color 0.15s",
            userSelect: "none",
          }}
          onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#141418"; e.currentTarget.style.color = C.textSecondary; } }}
          onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; } }}
        >
          <Icon size={20} />
          <span style={{ fontSize: 14, fontWeight: active ? 600 : 400 }}>{label}</span>
        </div>
      ))}
    </nav>
  );
}

/** Icons-only sidebar — tablet */
function NavSidebarCompact() {
  return (
    <nav style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>p</span>
      </div>
      {NAV_ITEMS.map(({ id, Icon, label, active }) => (
        <div
          key={id} title={label}
          style={{
            width: 42, height: 42,
            display: "flex", alignItems: "center", justifyContent: "center",
            borderRadius: 10, cursor: "pointer",
            background: active ? "#18181e" : "transparent",
            color: active ? C.accentSoft : C.textMuted,
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#141418"; e.currentTarget.style.color = C.textSecondary; } }}
          onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.textMuted; } }}
        >
          <Icon size={19} />
        </div>
      ))}
    </nav>
  );
}

/** Bottom tab bar — mobile */
function BottomNav() {
  const items = NAV_ITEMS.slice(0, 5);
  return (
    <nav style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
      background: "rgba(12,12,14,0.96)",
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      borderTop: `1px solid ${C.border}`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "8px 0 max(8px, env(safe-area-inset-bottom))",
    }}>
      {items.map(({ id, Icon, label, active }) => (
        <div
          key={id}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: active ? C.accentSoft : C.textMuted,
            cursor: "pointer", padding: "4px 10px",
            userSelect: "none",
            transition: "color 0.15s",
          }}
        >
          <Icon size={22} />
          <span style={{ fontSize: 10, fontWeight: active ? 600 : 400 }}>{label}</span>
        </div>
      ))}
    </nav>
  );
}

/** Sticky top bar — mobile */
function TopBar() {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 40,
      background: "rgba(12,12,14,0.95)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      borderBottom: `1px solid ${C.border}`,
      padding: "11px 16px",
      display: "flex", justifyContent: "space-between", alignItems: "center",
    }}>
      <span style={{ fontSize: 18, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.03em" }}>pulse</span>
      <div style={{ display: "flex", gap: 18, color: C.textMuted }}>
        <HeartIcon size={22} />
        <MessageIcon size={22} />
      </div>
    </header>
  );
}

// ─── Suggestions Sidebar ──────────────────────────────────────────────────────

function SuggestionsSidebar() {
  const [followed, setFollowed] = useState({});
  const toggle = id => setFollowed(f => ({ ...f, [id]: !f[id] }));

  return (
    <aside style={{ position: "sticky", top: 24 }}>
      {/* Current user */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
        <img src={CURRENT_USER.avatar} alt="" style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover" }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{CURRENT_USER.name}</div>
          <div style={{ fontSize: 12, color: C.textMuted }}>{CURRENT_USER.handle}</div>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, letterSpacing: "0.08em", marginBottom: 14 }}>
        SUGGESTED FOR YOU
      </div>

      {SUGGESTIONS.map(s => (
        <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <img src={s.avatar} alt="" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: C.textPrimary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</div>
            <div style={{ fontSize: 11, color: C.textMuted }}>{s.mutuals} mutual</div>
          </div>
          <button
            onClick={() => toggle(s.id)}
            style={{
              background: followed[s.id] ? C.surface2 : "transparent",
              border: `1px solid ${followed[s.id] ? C.border2 : C.accent}`,
              borderRadius: 6,
              padding: "3px 10px",
              fontSize: 12, fontWeight: 600,
              color: followed[s.id] ? C.textMuted : C.accentSoft,
              cursor: "pointer",
              transition: "all 0.18s",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
            onMouseEnter={e => { if (!followed[s.id]) e.currentTarget.style.background = "#1e1e2e"; }}
            onMouseLeave={e => { if (!followed[s.id]) e.currentTarget.style.background = "transparent"; }}
          >
            {followed[s.id] ? "Following" : "Follow"}
          </button>
        </div>
      ))}

      <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
        <p style={{ fontSize: 11, color: C.textDim, lineHeight: 1.9 }}>
          About · Help · Privacy · Terms<br />© 2025 Pulse
        </p>
      </div>
    </aside>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────

export default function HomeFeed() {
  const width = useWindowWidth();

  const isMobile  = width < 640;
  const isTablet  = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  const [posts, setPosts] = useState(null);
  const [ready, setReady] = useState(false);

  // Simulate network fetch
  useEffect(() => {
    const t = setTimeout(() => {
      setPosts(INITIAL_POSTS);
      setTimeout(() => setReady(true), 40);
    }, 1000);
    return () => clearTimeout(t);
  }, []);

  const handleLike = useCallback(id => {
    setPosts(ps => ps.map(p =>
      p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
    ));
  }, []);

  const handlePost = useCallback(text => {
    const newPost = {
      id: `p_${Date.now()}`,
      user: CURRENT_USER,
      isAnonymous: false,
      timestamp: "Just now",
      caption: text,
      image: null,
      likes: 0, liked: false,
      comments: [], totalComments: 0,
    };
    setPosts(ps => [newPost, ...(ps || [])]);
  }, []);

  // Grid config per breakpoint
  const gridCols = isDesktop
    ? "220px minmax(0, 560px) 240px"
    : isTablet
      ? "56px minmax(0, 1fr)"
      : "1fr";

  const outerPad   = isMobile ? 0 : "24px 16px";
  const maxWidth   = isDesktop ? 1080 : "100%";
  const colGap     = isDesktop ? 40 : isTablet ? 20 : 0;
  const feedPad    = isMobile ? "12px 12px 0" : 0;
  const feedBottom = isMobile ? "70px" : isTablet ? "32px" : "32px";

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.textPrimary,
      fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        textarea, button { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 4px; }
        textarea::placeholder { color: ${C.textDim}; }
      `}</style>

      {/* Mobile top bar */}
      {isMobile && <TopBar />}

      {/* Layout grid */}
      <div style={{
        maxWidth,
        margin: "0 auto",
        padding: outerPad,
        display: "grid",
        gridTemplateColumns: gridCols,
        gap: colGap,
        alignItems: "start",
      }}>

        {/* Left nav */}
        {isDesktop && <NavSidebar />}
        {isTablet  && <NavSidebarCompact />}

        {/* Feed */}
        <main style={{
          padding: feedPad,
          paddingBottom: feedBottom,
          opacity: ready ? 1 : 0,
          transform: ready ? "none" : "translateY(8px)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}>
          <CreatePost onPost={handlePost} />

          {!posts
            ? [1, 2, 3].map(i => <SkeletonPost key={i} />)
            : posts.map(p => <PostCard key={p.id} post={p} onLike={handleLike} />)
          }
        </main>

        {/* Right suggestions — desktop only */}
        {isDesktop && <SuggestionsSidebar />}
      </div>

      {/* Mobile bottom tab bar */}
      {isMobile && <BottomNav />}

      {/* Tablet floating compose button */}
      {isTablet && (
        <button
          title="New post"
          style={{
            position: "fixed", bottom: 24, right: 24, zIndex: 40,
            width: 48, height: 48, borderRadius: "50%",
            background: C.accent, border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
            transition: "background 0.15s, transform 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.accentHov; e.currentTarget.style.transform = "scale(1.06)"; }}
          onMouseLeave={e => { e.currentTarget.style.background = C.accent;    e.currentTarget.style.transform = "scale(1)"; }}
        >
          <PlusIcon size={22} />
        </button>
      )}
    </div>
  );
}