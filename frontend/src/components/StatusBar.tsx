"use client";

import { StatusBarProps } from "@/types";
import { Wifi, WifiOff, Settings, Sun, Battery } from "lucide-react";

export default function StatusBar({
  isConnected,
  onSettingsClick,
}: StatusBarProps) {
  const currentTime = new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const currentDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-white shadow-sm border-b border-slate-200 px-4 py-3 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-2xl">🌟</span>
          </div>
          <div>
            <h1 className="text-elderly-lg font-bold text-slate-800">Aura</h1>
            <p className="text-sm text-slate-500">Người bạn đồng hành</p>
          </div>
        </div>

        {/* Center - Date & Time */}
        <div className="hidden md:flex flex-col items-center">
          <span className="text-elderly-xl font-bold text-slate-800">
            {currentTime}
          </span>
          <span className="text-elderly-sm text-slate-500">{currentDate}</span>
        </div>

        {/* Right - Status & Settings */}
        <div className="flex items-center gap-4">
          {/* Weather/Sun Icon (decorative) */}
          <div className="hidden sm:flex items-center gap-2 text-yellow-500">
            <Sun className="w-6 h-6" />
            <span className="text-elderly-sm text-slate-600">25°C</span>
          </div>

          {/* Battery (decorative) */}
          <div className="hidden sm:flex items-center gap-1 text-green-500">
            <Battery className="w-6 h-6" />
          </div>

          {/* Connection Status */}
          <div
            className={`
            flex items-center gap-2 px-4 py-2 rounded-full
            ${
              isConnected
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
          >
            {isConnected ? (
              <Wifi className="w-5 h-5" />
            ) : (
              <WifiOff className="w-5 h-5" />
            )}
            <span className="text-elderly-sm font-medium hidden sm:inline">
              {isConnected ? "Đã kết nối" : "Mất kết nối"}
            </span>
          </div>

          {/* Settings Button */}
          <button
            onClick={onSettingsClick}
            className="
              w-12 h-12
              bg-slate-100 hover:bg-slate-200
              rounded-2xl
              flex items-center justify-center
              transition-all duration-200
            "
            aria-label="Cài đặt"
          >
            <Settings className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
