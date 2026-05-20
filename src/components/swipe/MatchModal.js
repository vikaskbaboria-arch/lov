"use client"
import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export const MatchModal = ({ match, currentUserAvatar, onClose, onMessage }) => {
  useEffect(() => {
    if (!match) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [match, onClose]);

  return (
    <AnimatePresence>
      {match && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          onClick={onClose}
          data-testid="match-modal"
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-8 text-center"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-neutral-900 hover:text-neutral-200"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-display text-[11px] uppercase tracking-[0.3em] text-neutral-500">
              its a
            </p>
            <h2 className="font-display mt-1 text-5xl font-semibold tracking-tight text-neutral-50">
              match.
            </h2>

            <div className="mt-7 flex items-center justify-center">
              <motion.div
                initial={{ x: 30, opacity: 0, rotate: -8 }}
                animate={{ x: 0, opacity: 1, rotate: -8 }}
                transition={{ delay: 0.15, duration: 0.3 }}
                className="-mr-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-neutral-950"
              >
                <img
                  src={currentUserAvatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ x: -30, opacity: 0, rotate: 8 }}
                animate={{ x: 0, opacity: 1, rotate: 8 }}
                transition={{ delay: 0.25, duration: 0.3 }}
                className="-ml-4 h-24 w-24 overflow-hidden rounded-full ring-2 ring-neutral-950"
              >
                <img src={match.photos[0]} alt="" className="h-full w-full object-cover" />
              </motion.div>
            </div>

            <p className="mt-6 text-sm text-neutral-400">
              you and <span className="text-neutral-100">{match.name}</span> liked each other.
            </p>

            <div className="mt-7 flex flex-col gap-2">
              <button
                type="button"
                onClick={onMessage}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-100 px-5 py-3 text-sm font-medium text-neutral-900 transition-colors hover:bg-white"
                data-testid="match-message-btn"
              >
                <MessageCircle className="h-4 w-4" />
                say hi
              </button>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-neutral-800 bg-neutral-900/60 px-5 py-3 text-sm font-medium text-neutral-200 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
              >
                keep swiping
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchModal;
