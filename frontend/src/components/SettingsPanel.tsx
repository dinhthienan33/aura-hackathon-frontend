"use client";

import { SettingsPanelProps } from "@/types";
import { X, User, Type, Volume2, Sun, Moon, Phone, Heart } from "lucide-react";

export default function SettingsPanel({
  settings,
  onSettingsChange,
  onClose,
}: SettingsPanelProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 rounded-t-3xl flex items-center justify-between">
          <h2 className="text-elderly-xl font-bold text-slate-800">
            ⚙️ Cài đặt
          </h2>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-all"
          >
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Settings Content */}
        <div className="p-6 space-y-6">
          {/* User Name */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <label className="text-elderly-lg font-semibold text-slate-700">
                Tên của bạn
              </label>
            </div>
            <input
              type="text"
              value={settings.userName}
              onChange={(e) =>
                onSettingsChange({ ...settings, userName: e.target.value })
              }
              className="
                w-full px-5 py-4
                text-elderly-base
                bg-white border-2 border-slate-200
                rounded-xl
                focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                transition-all
              "
              placeholder="Nhập tên của bạn"
            />
          </div>

          {/* Font Size */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Type className="w-5 h-5 text-purple-600" />
              </div>
              <label className="text-elderly-lg font-semibold text-slate-700">
                Cỡ chữ
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "normal", label: "Vừa", size: "text-base" },
                { value: "large", label: "Lớn", size: "text-lg" },
                { value: "extra-large", label: "Rất lớn", size: "text-xl" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    onSettingsChange({
                      ...settings,
                      fontSize: option.value as any,
                    })
                  }
                  className={`
                    py-4 px-3 rounded-xl font-semibold transition-all
                    ${option.size}
                    ${
                      settings.fontSize === option.value
                        ? "bg-purple-500 text-white"
                        : "bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-300"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Voice Speed */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-green-600" />
              </div>
              <label className="text-elderly-lg font-semibold text-slate-700">
                Tốc độ nói của Aura
              </label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "slow", label: "Chậm 🐢" },
                { value: "normal", label: "Bình thường" },
                { value: "fast", label: "Nhanh 🐇" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() =>
                    onSettingsChange({
                      ...settings,
                      voiceSpeed: option.value as any,
                    })
                  }
                  className={`
                    py-4 px-3 rounded-xl text-elderly-sm font-semibold transition-all
                    ${
                      settings.voiceSpeed === option.value
                        ? "bg-green-500 text-white"
                        : "bg-white border-2 border-slate-200 text-slate-700 hover:border-green-300"
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Theme */}
          <div className="bg-slate-50 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Sun className="w-5 h-5 text-yellow-600" />
              </div>
              <label className="text-elderly-lg font-semibold text-slate-700">
                Giao diện
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() =>
                  onSettingsChange({ ...settings, theme: "light" })
                }
                className={`
                  py-4 px-3 rounded-xl text-elderly-base font-semibold transition-all
                  flex items-center justify-center gap-2
                  ${
                    settings.theme === "light"
                      ? "bg-yellow-500 text-white"
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:border-yellow-300"
                  }
                `}
              >
                <Sun className="w-5 h-5" />
                Sáng
              </button>
              <button
                onClick={() => onSettingsChange({ ...settings, theme: "dark" })}
                className={`
                  py-4 px-3 rounded-xl text-elderly-base font-semibold transition-all
                  flex items-center justify-center gap-2
                  ${
                    settings.theme === "dark"
                      ? "bg-slate-700 text-white"
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-400"
                  }
                `}
              >
                <Moon className="w-5 h-5" />
                Tối
              </button>
            </div>
          </div>

          {/* Emergency Contact Info */}
          <div className="bg-red-50 rounded-2xl p-5 border-2 border-red-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <label className="text-elderly-lg font-semibold text-red-700">
                Liên hệ khẩn cấp
              </label>
            </div>
            <p className="text-elderly-sm text-red-600 mb-3">
              Khi bạn nhấn nút SOS, người thân sẽ được thông báo ngay lập tức.
            </p>
            <div className="flex items-center gap-2 text-elderly-base text-red-700">
              <Heart className="w-5 h-5" />
              <span>Người thân: 0912 345 678</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 rounded-b-3xl">
          <button
            onClick={onClose}
            className="
              w-full py-4
              bg-blue-500 hover:bg-blue-600
              text-white text-elderly-lg font-bold
              rounded-2xl
              transition-all
            "
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
}
