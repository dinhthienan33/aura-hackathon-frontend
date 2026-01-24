"use client";

import { useState } from "react";
import { WelcomeModalProps } from "@/types";
import { Heart, Sparkles, Shield, MessageCircle } from "lucide-react";

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");

  const handleComplete = () => {
    onClose(name || "Bạn");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl overflow-hidden">
        {step === 1 && (
          <div className="p-8 text-center">
            {/* Welcome Animation */}
            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center animate-float">
              <span className="text-6xl">🌟</span>
            </div>

            <h1 className="text-elderly-2xl font-bold text-slate-800 mb-4">
              Xin chào!
            </h1>
            <p className="text-elderly-lg text-slate-600 mb-8 leading-relaxed">
              Chào mừng bạn đến với{" "}
              <strong className="text-blue-600">Aura</strong> - người bạn đồng
              hành luôn sẵn sàng lắng nghe và trò chuyện cùng bạn.
            </p>

            <button
              onClick={() => setStep(2)}
              className="
                w-full py-5
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white text-elderly-xl font-bold
                rounded-2xl
                hover:opacity-90
                transition-all
                shadow-lg hover:shadow-xl
              "
            >
              Bắt đầu nào ✨
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <h2 className="text-elderly-xl font-bold text-slate-800 mb-6 text-center">
              Aura có thể giúp bạn
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    Trò chuyện thân thiện
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    Aura luôn sẵn sàng lắng nghe câu chuyện của bạn
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    Ghi nhớ kỷ niệm
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    Aura nhớ những gì bạn kể và sẽ hỏi thăm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-2xl">
                <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <h3 className="text-elderly-lg font-semibold text-slate-800">
                    Luôn bên bạn
                  </h3>
                  <p className="text-elderly-sm text-slate-600">
                    Nhấn SOS khi cần, Aura sẽ gọi người thân giúp bạn
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setStep(3)}
              className="
                w-full py-5
                bg-gradient-to-r from-blue-500 to-purple-600
                text-white text-elderly-xl font-bold
                rounded-2xl
                hover:opacity-90
                transition-all
              "
            >
              Tiếp tục →
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="p-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="w-12 h-12 text-purple-500" />
            </div>

            <h2 className="text-elderly-xl font-bold text-slate-800 mb-4">
              Bạn tên gì ạ?
            </h2>
            <p className="text-elderly-base text-slate-600 mb-6">
              Aura muốn được gọi bạn bằng tên thân mật
            </p>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên của bạn"
              className="
                w-full px-6 py-5
                text-elderly-lg text-center
                bg-slate-50 border-2 border-slate-200
                rounded-2xl
                focus:border-blue-400 focus:ring-4 focus:ring-blue-100
                transition-all
                mb-6
              "
              autoFocus
            />

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="
                  flex-1 py-5
                  bg-slate-200 hover:bg-slate-300
                  text-slate-700 text-elderly-lg font-semibold
                  rounded-2xl
                  transition-all
                "
              >
                ← Quay lại
              </button>
              <button
                onClick={handleComplete}
                className="
                  flex-1 py-5
                  bg-gradient-to-r from-blue-500 to-purple-600
                  text-white text-elderly-lg font-bold
                  rounded-2xl
                  hover:opacity-90
                  transition-all
                "
              >
                Bắt đầu! 🎉
              </button>
            </div>
          </div>
        )}

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 pb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`
                w-3 h-3 rounded-full transition-all
                ${step === s ? "bg-blue-500 w-8" : "bg-slate-300"}
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
