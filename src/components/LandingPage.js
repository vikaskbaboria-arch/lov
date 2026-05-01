"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const GlitchText = ({ text, className = "" }) => {
  return (
    <span className={`glitch-wrapper ${className}`} data-text={text}>
      {text}
      <style>{`
        .glitch-wrapper {
          position: relative;
          display: inline-block;
        }
        .glitch-wrapper::before,
        .glitch-wrapper::after {
          content: attr(data-text);
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
        }
        .glitch-wrapper::before {
          color: #ff2d78;
          animation: glitch1 3s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%);
        }
        .glitch-wrapper::after {
          color: #00f0ff;
          animation: glitch2 3s infinite;
          clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
        }
        @keyframes glitch1 {
          0%,90%,100% { transform: translate(0); opacity: 0; }
          92% { transform: translate(-3px, 1px); opacity: 1; }
          94% { transform: translate(3px, -1px); opacity: 1; }
          96% { transform: translate(-2px, 0); opacity: 1; }
        }
        @keyframes glitch2 {
          0%,90%,100% { transform: translate(0); opacity: 0; }
          93% { transform: translate(3px, 2px); opacity: 1; }
          95% { transform: translate(-3px, -2px); opacity: 1; }
          97% { transform: translate(2px, 1px); opacity: 1; }
        }
      `}</style>
    </span>
  );
};

const FloatingHeart = ({ style }) => (
  <div className="floating-heart" style={style}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        fill="url(#hg)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2d78" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
    <style>{`
      .floating-heart {
        position: absolute;
        animation: floatUp 8s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes floatUp {
        0% { transform: translateY(0) scale(1); opacity: 0.7; }
        50% { transform: translateY(-40px) scale(1.2); opacity: 0.4; }
        100% { transform: translateY(0) scale(1); opacity: 0.7; }
      }
    `}</style>
  </div>
);

const NavBar = () => (
  <nav style={{
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: "1rem 2rem",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    background: "rgba(10,5,20,0.7)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,45,120,0.15)",
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <span style={{
        fontSize: "1.8rem", fontWeight: 900,
        background: "linear-gradient(135deg, #ff2d78, #a855f7, #00f0ff)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        fontFamily: "'VT323', 'Courier New', monospace",
        letterSpacing: "0.15em",
      }}>LOV</span>
      <span style={{
        fontSize: "0.6rem", color: "#ff2d78", fontFamily: "monospace",
        border: "1px solid #ff2d78", padding: "1px 5px", borderRadius: "3px",
        letterSpacing: "0.1em",
      }}>BETA</span>
    </div>
    <div style={{ display: "flex", gap: "2rem" }}>
      {["Features", "How it Works", "Preview"].map(item => (
        <a key={item} href={`#${item.toLowerCase().replace(/ /g, "-")}`} style={{
          color: "rgba(255,255,255,0.6)", fontSize: "0.85rem",
          textDecoration: "none", fontFamily: "monospace",
          letterSpacing: "0.05em",
          transition: "color 0.2s",
        }}
          onMouseEnter={e => e.target.style.color = "#ff2d78"}
          onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
        >{item}</a>
      ))}
    </div>
    <button style={{
      background: "linear-gradient(135deg, #ff2d78, #a855f7)",
      border: "none", borderRadius: "6px",
      color: "white", padding: "0.5rem 1.2rem",
      fontSize: "0.85rem", fontFamily: "monospace",
      cursor: "pointer", letterSpacing: "0.05em",
      boxShadow: "0 0 14px rgba(255,45,120,0.4)",
    }}>Login</button>
  </nav>
);

const HeroSection = () => {
  const router = useRouter()
  const hearts = [
    { top: "15%", left: "8%", animationDelay: "0s", animationDuration: "7s" },
    { top: "60%", left: "5%", animationDelay: "1s", animationDuration: "9s" },
    { top: "30%", right: "6%", animationDelay: "2s", animationDuration: "8s" },
    { top: "70%", right: "10%", animationDelay: "0.5s", animationDuration: "6s" },
    { top: "80%", left: "20%", animationDelay: "3s", animationDuration: "10s" },
    { top: "20%", right: "22%", animationDelay: "1.5s", animationDuration: "7.5s" },
  ];
 const RegisterPage = ()=>{
    router.push('/register/')
 }
 const LoginPage =()=>{
  router.push('/login/')
 }
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "6rem 2rem 4rem",
    }}>
      {/* Glow blobs */}
      {/* <div style={{
        position: "absolute", top: "20%", left: "15%",
        width: "320px", height: "320px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,45,120,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", top: "30%", right: "15%",
        width: "280px", height: "280px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "40%",
        width: "240px", height: "240px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)",
        filter: "blur(40px)",
      }} /> */}

      {hearts.map((s, i) => <FloatingHeart key={i} style={s} />)}

      {/* Retro grid line */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
        backgroundImage: "linear-gradient(transparent, rgba(255,45,120,0.04)), repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,45,120,0.08) 40px, rgba(255,45,120,0.08) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,45,120,0.08) 40px, rgba(255,45,120,0.08) 41px)",
      }} />

      <div style={{ textAlign: "center", position: "relative", zIndex: 1, maxWidth: "780px" }}>
        <div style={{
          display: "inline-block", marginBottom: "1.2rem",
          background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.3)",
          borderRadius: "20px", padding: "0.35rem 1rem",
          fontSize: "0.75rem", color: "#ff2d78", fontFamily: "monospace",
          letterSpacing: "0.15em",
        }}>★ NOW IN BETA — JOIN FOR FREE ★</div>

        <h1 style={{
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          fontWeight: 900,
          lineHeight: 1.1,
          marginBottom: "1.5rem",
          fontFamily: "'VT323', 'Courier New', monospace",
        }}>
          <GlitchText
            text="No Swipes. Just Real Connections."
            className=""
          />
          <br />
          <span style={{
            background: "linear-gradient(135deg, #ff2d78 0%, #a855f7 50%, #00f0ff 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>
           
          </span>
        </h1>

        <p style={{
          fontSize: "1.1rem", color: "rgba(255,255,255,0.65)",
          maxWidth: "520px", margin: "0 auto 2.5rem",
          lineHeight: 1.7, fontFamily: "monospace",
        }}>
          Real-time chat · Smart AI matching · Meaningful connections.<br />
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.85rem" }}>
            Because love shouldn't come with a loading screen.
          </span>
        </p>

        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={RegisterPage} style={{
            padding: "0.85rem 2.2rem",
            background: "linear-gradient(135deg, #ff2d78, #a855f7)",
            border: "none", borderRadius: "8px",
            color: "white", fontSize: "1rem",
            fontFamily: "monospace", fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em",
            boxShadow: "0 0 28px rgba(255,45,120,0.5), 0 0 50px rgba(168,85,247,0.2)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.05)"; e.target.style.boxShadow = "0 0 40px rgba(255,45,120,0.7), 0 0 70px rgba(168,85,247,0.3)"; }}
            onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.boxShadow = "0 0 28px rgba(255,45,120,0.5), 0 0 50px rgba(168,85,247,0.2)"; }}
          >Get Started ♥</button>
          <button onClick={LoginPage} style={{
            padding: "0.85rem 2.2rem",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px",
            color: "rgba(255,255,255,0.8)", fontSize: "1rem",
            fontFamily: "monospace", fontWeight: 700,
            cursor: "pointer", letterSpacing: "0.05em",
            backdropFilter: "blur(8px)",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.target.style.borderColor = "#a855f7"; e.target.style.color = "#a855f7"; e.target.style.boxShadow = "0 0 20px rgba(168,85,247,0.3)"; }}
            onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.25)"; e.target.style.color = "rgba(255,255,255,0.8)"; e.target.style.boxShadow = "none"; }}
          >Login</button>
        </div>

        <div style={{
          marginTop: "3rem", display: "flex", gap: "2.5rem",
          justifyContent: "center", flexWrap: "wrap",
        }}>
          {[["12K+", "Matches Made"], ["98%", "Happy Users"], ["2M+", "Messages Sent"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "1.6rem", fontWeight: 900,
                fontFamily: "'VT323', monospace",
                background: "linear-gradient(135deg, #ff2d78, #a855f7)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{num}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", fontFamily: "monospace", letterSpacing: "0.1em" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, desc }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(255,45,120,0.08)"
          : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(255,45,120,0.4)" : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px", padding: "2rem",
        backdropFilter: "blur(12px)",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: hovered ? "0 20px 50px rgba(255,45,120,0.15), 0 0 30px rgba(168,85,247,0.1)" : "none",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
      <h3 style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: "1.4rem", color: "white", marginBottom: "0.6rem",
        letterSpacing: "0.05em",
      }}>{title}</h3>
      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.88rem", lineHeight: 1.7, fontFamily: "monospace" }}>{desc}</p>
    </div>
  );
};

const FeaturesSection = () => (
  <section id="features" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
    <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
      <div style={{
        fontSize: "0.75rem", fontFamily: "monospace", color: "#a855f7",
        letterSpacing: "0.2em", marginBottom: "0.8rem",
      }}>— FEATURES —</div>
      <h2 style={{
        fontFamily: "'VT323', 'Courier New', monospace",
        fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "white",
      }}>
        <GlitchText text="Built Different." />
      </h2>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
      <FeatureCard icon="💬" title="Real-Time Chat" desc="Instant messaging with live presence indicators. No delays, no excuses — just you and your match, right now." />
      <FeatureCard icon="❤️" title="Smart AI Matching" desc="Our AI reads between the lines. Compatibility powered by behavior, vibe, and what you actually care about." />
      <FeatureCard icon="⏳" title="Auto-Delete Posts" desc="Posts vanish after 24 hours. Keep it spontaneous. Keep it real. No archives, no overthinking." />
    </div>
  </section>
);

const StepCard = ({ number, title, desc, color }) => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    textAlign: "center", position: "relative",
  }}>
    <div style={{
      width: "64px", height: "64px", borderRadius: "50%",
      background: `rgba(${color}, 0.15)`,
      border: `2px solid rgba(${color}, 0.5)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      marginBottom: "1.2rem",
      boxShadow: `0 0 20px rgba(${color}, 0.3)`,
      fontFamily: "'VT323', monospace",
      fontSize: "1.8rem", color: `rgb(${color})`,
    }}>{number}</div>
    <h3 style={{
      fontFamily: "'VT323', 'Courier New', monospace",
      fontSize: "1.3rem", color: "white", marginBottom: "0.5rem",
    }}>{title}</h3>
    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.85rem", lineHeight: 1.7, fontFamily: "monospace" }}>{desc}</p>
  </div>
);

const HowItWorksSection = () => (
  <section id="how-it-works" style={{
    padding: "6rem 2rem",
    background: "linear-gradient(180deg, transparent 0%, rgba(168,85,247,0.04) 50%, transparent 100%)",
  }}>
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#00f0ff", letterSpacing: "0.2em", marginBottom: "0.8rem" }}>— HOW IT WORKS —</div>
        <h2 style={{ fontFamily: "'VT323', 'Courier New', monospace", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "white" }}>
          <GlitchText text="Three Steps to ♥" />
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2rem", position: "relative" }}>
        <StepCard number="01" title="Create Profile" desc="Set up your profile in seconds. Your aesthetic, your vibe, your rules." color="255,45,120" />
        <StepCard number="02" title="Get Matched" desc="Our AI finds your people based on real compatibility, not just looks." color="168,85,247" />
        <StepCard number="03" title="Start Chatting" desc="Jump into real-time conversations. Spark, connect, and fall in love." color="0,240,255" />
      </div>
    </div>
  </section>
);

const MockChat = () => {
  const messages = [
    { from: "them", text: "hey, saw we matched 👀", time: "9:41 PM" },
    { from: "me", text: "omg finally!! I've been waiting haha ❤️", time: "9:41 PM" },
    { from: "them", text: "your music taste is literally perfect btw", time: "9:42 PM" },
    { from: "me", text: "we should go to a show sometime 🎶", time: "9:43 PM" },
    { from: "them", text: "say less. when are you free?", time: "9:43 PM" },
  ];
  return (
    <div style={{
      background: "rgba(10,5,25,0.9)",
      border: "1px solid rgba(255,45,120,0.2)",
      borderRadius: "16px", overflow: "hidden",
      backdropFilter: "blur(20px)",
      boxShadow: "0 0 40px rgba(255,45,120,0.1)",
    }}>
      {/* Header */}
      <div style={{
        padding: "1rem 1.2rem",
        background: "rgba(255,45,120,0.08)",
        borderBottom: "1px solid rgba(255,45,120,0.15)",
        display: "flex", alignItems: "center", gap: "0.8rem",
      }}>
        <div style={{
          width: "38px", height: "38px", borderRadius: "50%",
          background: "linear-gradient(135deg, #ff2d78, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.1rem",
        }}>💜</div>
        <div>
          <div style={{ color: "white", fontSize: "0.9rem", fontFamily: "monospace", fontWeight: 600 }}>alex_matches</div>
          <div style={{ color: "#00f0ff", fontSize: "0.7rem", fontFamily: "monospace" }}>● online now</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>99% compat.</div>
      </div>
      {/* Messages */}
      <div style={{ padding: "1.2rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "75%",
              background: m.from === "me"
                ? "linear-gradient(135deg, #ff2d78, #a855f7)"
                : "rgba(255,255,255,0.08)",
              borderRadius: m.from === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              padding: "0.55rem 0.9rem",
              border: m.from === "them" ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}>
              <div style={{ color: "white", fontSize: "0.82rem", fontFamily: "monospace", lineHeight: 1.5 }}>{m.text}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.62rem", fontFamily: "monospace", marginTop: "2px", textAlign: "right" }}>{m.time}</div>
            </div>
          </div>
        ))}
      </div>
      {/* Input */}
      <div style={{
        padding: "0.8rem 1.2rem",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex", gap: "0.6rem", alignItems: "center",
      }}>
        <div style={{
          flex: 1, background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "10px", padding: "0.5rem 0.9rem",
          color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", fontFamily: "monospace",
        }}>type a message...</div>
        <div style={{
          width: "36px", height: "36px", borderRadius: "10px",
          background: "linear-gradient(135deg, #ff2d78, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1rem", cursor: "pointer",
        }}>♥</div>
      </div>
    </div>
  );
};

const MockFeed = () => {
  const posts = [
    { user: "zara.v", compat: "97%", text: "looking for someone to watch sunsets with 🌅", tags: ["#vibes", "#music"], time: "23h left", avatar: "🌸" },
    { user: "kai_dev", compat: "92%", text: "if you can name 3 radiohead albums we're soulmates", tags: ["#music", "#nerd"], time: "11h left", avatar: "🎸" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {posts.map((p, i) => (
        <div key={i} style={{
          background: "rgba(10,5,25,0.9)",
          border: "1px solid rgba(168,85,247,0.2)",
          borderRadius: "14px", padding: "1.1rem",
          backdropFilter: "blur(20px)",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.7rem", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{p.avatar}</span>
              <div>
                <div style={{ color: "white", fontSize: "0.82rem", fontFamily: "monospace", fontWeight: 600 }}>{p.user}</div>
                <div style={{ color: "#a855f7", fontSize: "0.65rem", fontFamily: "monospace" }}>{p.compat} match</div>
              </div>
            </div>
            <div style={{
              fontSize: "0.65rem", fontFamily: "monospace", color: "#ff2d78",
              background: "rgba(255,45,120,0.1)", border: "1px solid rgba(255,45,120,0.25)",
              padding: "2px 8px", borderRadius: "20px",
            }}>⏳ {p.time}</div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.83rem", fontFamily: "monospace", lineHeight: 1.6, marginBottom: "0.7rem" }}>{p.text}</p>
          <div style={{ display: "flex", gap: "0.4rem" }}>
            {p.tags.map(t => (
              <span key={t} style={{
                fontSize: "0.65rem", fontFamily: "monospace", color: "#00f0ff",
                background: "rgba(0,240,255,0.08)", border: "1px solid rgba(0,240,255,0.2)",
                padding: "2px 8px", borderRadius: "20px",
              }}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const PreviewSection = () => {
  const [tab, setTab] = useState("chat");
  return (
    <section id="preview" style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ textAlign: "center", marginBottom: "3rem" }}>
        <div style={{ fontSize: "0.75rem", fontFamily: "monospace", color: "#ff2d78", letterSpacing: "0.2em", marginBottom: "0.8rem" }}>— APP PREVIEW —</div>
        <h2 style={{ fontFamily: "'VT323', 'Courier New', monospace", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "white" }}>
          <GlitchText text="See it in Action." />
        </h2>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "2rem" }}>
        {[["chat", "💬 Chat"], ["feed", "🔥 Feed"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{
            padding: "0.5rem 1.4rem",
            background: tab === id ? "linear-gradient(135deg, #ff2d78, #a855f7)" : "transparent",
            border: `1px solid ${tab === id ? "transparent" : "rgba(255,255,255,0.15)"}`,
            borderRadius: "8px", color: "white",
            fontSize: "0.82rem", fontFamily: "monospace",
            cursor: "pointer", transition: "all 0.2s",
          }}>{label}</button>
        ))}
      </div>

      <div style={{ maxWidth: "440px", margin: "0 auto" }}>
        {tab === "chat" ? <MockChat /> : <MockFeed />}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer style={{
    borderTop: "1px solid rgba(255,45,120,0.12)",
    padding: "2.5rem 2rem",
    background: "rgba(5,2,15,0.8)",
  }}>
    <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem" }}>
      <div>
        <div style={{
          fontSize: "1.6rem", fontWeight: 900,
          fontFamily: "'VT323', 'Courier New', monospace",
          background: "linear-gradient(135deg, #ff2d78, #a855f7, #00f0ff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "0.15em",
        }}>LOV</div>
        <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", fontFamily: "monospace", marginTop: "2px" }}>© 2025 LOV. All rights reserved.</div>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {["Privacy", "Terms", "Contact", "Twitter", "Instagram"].map(link => (
          <a key={link} href="#" style={{
            color: "rgba(255,255,255,0.35)", fontSize: "0.78rem",
            textDecoration: "none", fontFamily: "monospace",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => e.target.style.color = "#ff2d78"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
          >{link}</a>
        ))}
      </div>
    </div>
  </footer>
);

export default function LOVLandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          background: #060210;
          color: white;
          font-family: 'Courier New', monospace;
          overflow-x: hidden;
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #060210; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(#ff2d78, #a855f7); border-radius: 4px; }
      `}</style>
      <div style={{
        background: "radial-gradient(ellipse at top, #1a0530 0%, #060210 45%, #000 100%)",
        minHeight: "100vh",
      }}>
        <NavBar />
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <PreviewSection />
        <Footer />
      </div>
    </>
  );
}