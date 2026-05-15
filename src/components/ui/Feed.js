import React from 'react'

const Feed = ({post}) => {
  const posts = [
    { user: "zara.v", compat: "97%", text: "looking for someone to watch sunsets with", tags: ["#vibes", "#music"], time: "23h left", avatar: "🌸" },
    { user: "kai_dev", compat: "92%", text: "if you can name 3 radiohead albums we're soulmates", tags: ["#music", "#nerd"], time: "11h left", avatar: "🎸" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {posts.map((p, i) => (
        <div key={i} style={{
          background: "rgba(10,10,10,0.95)",
          border: "1px solid rgba(255,45,120,0.2)",
          borderRadius: "14px", padding: "1.1rem",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{p.avatar}</span>
              <div>
                <div style={{ color: "white", fontSize: "0.82rem", fontFamily: "monospace", fontWeight: 600 }}>{p.user}</div>
                <div style={{ color: "#10b981", fontSize: "0.65rem", fontFamily: "monospace" }}>{p.compat} match</div>
              </div>
            </div>
            <div style={{
              fontSize: "0.65rem", fontFamily: "monospace", color: "#ff2d78",
              background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.25)",
              padding: "2px 8px", borderRadius: "20px",
            }}>{p.time}</div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.83rem", fontFamily: "monospace", lineHeight: 1.6, marginBottom: "0.7rem" }}>{p.text}</p>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: "0.65rem", fontFamily: "monospace", color: "#34d399",
                background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)",
                padding: "2px 8px", borderRadius: "20px",
              }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed
