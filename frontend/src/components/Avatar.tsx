"use client";

import { useEffect, useState } from "react";
import { AvatarProps } from "@/types";

export default function Avatar({
  state,
  isSpeaking,
  isListening,
}: AvatarProps) {
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);

  // Lip sync animation when speaking
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setMouthOpen((prev) => !prev);
      }, 150);
      return () => clearInterval(interval);
    } else {
      setMouthOpen(false);
    }
  }, [isSpeaking]);

  // Natural blinking animation
  useEffect(() => {
    const blink = () => {
      setEyesClosed(true);
      setTimeout(() => setEyesClosed(false), 150);
    };

    const interval = setInterval(blink, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  // Get state-specific styling
  const getStateStyle = () => {
    switch (state) {
      case "listening":
        return "ring-4 ring-blue-400 ring-opacity-60";
      case "thinking":
        return "ring-4 ring-purple-400 ring-opacity-60";
      case "speaking":
        return "ring-4 ring-green-400 ring-opacity-60";
      default:
        return "";
    }
  };

  // Get state label
  const getStateLabel = () => {
    switch (state) {
      case "listening":
        return "🎧 Đang lắng nghe...";
      case "thinking":
        return "💭 Đang suy nghĩ...";
      case "speaking":
        return "💬 Đang nói...";
      default:
        return "😊 Sẵn sàng trò chuyện";
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar Container */}
      <div
        className={`
          relative w-64 h-64 md:w-80 md:h-80 
          rounded-full overflow-hidden 
          bg-gradient-to-br from-blue-100 to-purple-100 
          shadow-2xl avatar-glow
          transition-all duration-300
          ${getStateStyle()}
          ${state === "idle" ? "animate-breathe" : ""}
        `}
      >
        {/* SVG Avatar */}
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Circle */}
          <circle cx="100" cy="100" r="98" fill="url(#bgGradient)" />

          {/* Face Base */}
          <ellipse cx="100" cy="110" rx="70" ry="75" fill="#FFE4C4" />

          {/* Hair */}
          <path
            d="M30 90 Q30 30, 100 25 Q170 30, 170 90 Q165 70, 140 65 Q120 60, 100 60 Q80 60, 60 65 Q35 70, 30 90"
            fill="#8B7355"
          />

          {/* Left Eye */}
          <g transform="translate(65, 95)">
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={eyesClosed ? 2 : 15}
              fill="white"
              className="transition-all duration-150"
            />
            {!eyesClosed && (
              <>
                <circle
                  cx={isListening ? -2 : 0}
                  cy="2"
                  r="7"
                  fill="#4A3728"
                  className="transition-all duration-300"
                />
                <circle cx={isListening ? -4 : -2} cy="0" r="2" fill="white" />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g transform="translate(135, 95)">
            <ellipse
              cx="0"
              cy="0"
              rx="12"
              ry={eyesClosed ? 2 : 15}
              fill="white"
              className="transition-all duration-150"
            />
            {!eyesClosed && (
              <>
                <circle
                  cx={isListening ? -2 : 0}
                  cy="2"
                  r="7"
                  fill="#4A3728"
                  className="transition-all duration-300"
                />
                <circle cx={isListening ? -4 : -2} cy="0" r="2" fill="white" />
              </>
            )}
          </g>

          {/* Eyebrows */}
          <path
            d="M50 78 Q65 72, 80 78"
            stroke="#6B5344"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className={isListening ? "transform -translate-y-1" : ""}
          />
          <path
            d="M120 78 Q135 72, 150 78"
            stroke="#6B5344"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className={isListening ? "transform -translate-y-1" : ""}
          />

          {/* Nose */}
          <path
            d="M100 105 Q95 120, 100 130 Q105 130, 105 125"
            stroke="#DEB887"
            strokeWidth="2"
            fill="none"
          />

          {/* Mouth */}
          <g transform="translate(100, 150)">
            {isSpeaking ? (
              // Speaking mouth - animated
              <ellipse
                cx="0"
                cy="0"
                rx="15"
                ry={mouthOpen ? 12 : 5}
                fill="#D2691E"
                className="transition-all duration-100"
              />
            ) : (
              // Smiling mouth
              <path
                d="M-20 0 Q0 15, 20 0"
                stroke="#D2691E"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />
            )}
          </g>

          {/* Blush */}
          <circle cx="55" cy="125" r="12" fill="#FFB6C1" opacity="0.5" />
          <circle cx="145" cy="125" r="12" fill="#FFB6C1" opacity="0.5" />

          {/* Glasses (optional elderly feature) */}
          <g stroke="#4A4A4A" strokeWidth="2" fill="none">
            <circle cx="65" cy="95" r="20" />
            <circle cx="135" cy="95" r="20" />
            <path d="M85 95 L115 95" />
            <path d="M45 95 L30 85" />
            <path d="M155 95 L170 85" />
          </g>

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#F3E8FF" />
            </linearGradient>
          </defs>
        </svg>

        {/* Listening Animation Overlay */}
        {isListening && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute w-full h-full border-4 border-blue-400 rounded-full animate-ping opacity-30" />
          </div>
        )}

        {/* Thinking Animation Overlay */}
        {state === "thinking" && (
          <div className="absolute top-4 right-4">
            <div className="flex space-x-1">
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <div
                className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Avatar Name */}
      <h2 className="mt-6 text-elderly-2xl font-bold text-slate-700">Aura</h2>

      {/* Status Label */}
      <p
        className={`
        mt-2 text-elderly-lg px-6 py-2 rounded-full
        transition-all duration-300
        ${state === "listening" ? "bg-blue-100 text-blue-700" : ""}
        ${state === "thinking" ? "bg-purple-100 text-purple-700" : ""}
        ${state === "speaking" ? "bg-green-100 text-green-700" : ""}
        ${state === "idle" ? "bg-slate-100 text-slate-600" : ""}
      `}
      >
        {getStateLabel()}
      </p>
    </div>
  );
}
