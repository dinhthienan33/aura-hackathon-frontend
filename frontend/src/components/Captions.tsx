"use client";

import { motion, AnimatePresence } from "framer-motion";

interface CaptionsProps {
  text: string;
  isVisible: boolean;
  speaker?: "user" | "aura";
}

export default function Captions({
  text,
  isVisible,
  speaker = "aura",
}: CaptionsProps) {
  return (
    <AnimatePresence>
      {isVisible && text && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full max-w-2xl mx-auto px-4"
        >
          <div
            className={`
              captions-container
              ${speaker === "user" 
                ? "bg-sage-600/90 text-white" 
                : "bg-navy-900/90 text-white"
              }
              px-8 py-4
              rounded-warm-xl
              shadow-2xl
              backdrop-blur-sm
            `}
          >
            {/* Speaker indicator */}
            <div className="flex items-center gap-2 mb-2 opacity-70">
              <span className="text-elderly-sm">
                {speaker === "user" ? "🗣️ Bạn nói:" : "🌟 Aura:"}
              </span>
            </div>

            {/* Caption text */}
            <p className="text-elderly-lg md:text-elderly-xl leading-relaxed font-medium">
              {text}
            </p>

            {/* Typing indicator animation */}
            {speaker === "aura" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-1 mt-2 justify-end"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                  className="w-2 h-2 rounded-full bg-white/50"
                />
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
