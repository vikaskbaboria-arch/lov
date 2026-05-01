import React from 'react'

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

export default GlitchText