"use client";

export default function Modal({ onClose, children, className = "", maxWidth = "max-w-lg" }) {
  return (
    <div className="lov-overlay" onClick={onClose}>
      <div
        className={`lov-modal ${maxWidth} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
