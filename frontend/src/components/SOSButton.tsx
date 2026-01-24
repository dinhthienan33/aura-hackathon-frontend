"use client";

import { useState } from "react";
import { SOSButtonProps } from "@/types";
import { Phone, X, AlertTriangle } from "lucide-react";

export default function SOSButton({ onClick }: SOSButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [isActivated, setIsActivated] = useState(false);

  const handleClick = () => {
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setIsActivated(true);

    // Countdown before calling
    let count = 5;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);

      if (count === 0) {
        clearInterval(interval);
        onClick();
        setShowConfirm(false);
        setIsActivated(false);
        setCountdown(5);
      }
    }, 1000);
  };

  const handleCancel = () => {
    setShowConfirm(false);
    setIsActivated(false);
    setCountdown(5);
  };

  return (
    <>
      {/* Main SOS Button - Fixed Position */}
      <button
        onClick={handleClick}
        className="
          fixed bottom-6 right-6 z-40
          w-20 h-20 md:w-24 md:h-24
          bg-red-500 hover:bg-red-600
          text-white
          rounded-full
          shadow-2xl
          flex flex-col items-center justify-center
          transition-all duration-200
          hover:scale-110
          sos-pulse
        "
        aria-label="Nút SOS - Gọi trợ giúp khẩn cấp"
      >
        <Phone className="w-8 h-8 md:w-10 md:h-10 mb-1" />
        <span className="text-sm md:text-base font-bold">SOS</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Header */}
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-elderly-xl font-bold text-center text-slate-800 mb-4">
              {isActivated ? "Đang gọi trợ giúp..." : "Xác nhận gọi trợ giúp?"}
            </h2>

            <p className="text-elderly-base text-center text-slate-600 mb-6">
              {isActivated
                ? `Đang liên hệ người thân trong ${countdown} giây...`
                : "Aura sẽ thông báo đến người thân của bạn rằng bạn cần được hỗ trợ."}
            </p>

            {/* Countdown Circle (when activated) */}
            {isActivated && (
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 rounded-full border-8 border-red-200 flex items-center justify-center relative">
                  <div
                    className="absolute inset-0 rounded-full border-8 border-red-500 border-t-transparent animate-spin"
                    style={{ animationDuration: "1s" }}
                  />
                  <span className="text-elderly-2xl font-bold text-red-500">
                    {countdown}
                  </span>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col gap-4">
              {!isActivated ? (
                <>
                  <button
                    onClick={handleConfirm}
                    className="
                      w-full py-5
                      bg-red-500 hover:bg-red-600
                      text-white text-elderly-lg font-bold
                      rounded-2xl
                      transition-all duration-200
                      flex items-center justify-center gap-3
                    "
                  >
                    <Phone className="w-7 h-7" />
                    Gọi ngay
                  </button>
                  <button
                    onClick={handleCancel}
                    className="
                      w-full py-5
                      bg-slate-200 hover:bg-slate-300
                      text-slate-700 text-elderly-lg font-semibold
                      rounded-2xl
                      transition-all duration-200
                      flex items-center justify-center gap-3
                    "
                  >
                    <X className="w-7 h-7" />
                    Hủy bỏ
                  </button>
                </>
              ) : (
                <button
                  onClick={handleCancel}
                  className="
                    w-full py-5
                    bg-slate-700 hover:bg-slate-800
                    text-white text-elderly-lg font-bold
                    rounded-2xl
                    transition-all duration-200
                    flex items-center justify-center gap-3
                  "
                >
                  <X className="w-7 h-7" />
                  Hủy cuộc gọi
                </button>
              )}
            </div>

            {/* Help Text */}
            <p className="text-sm text-slate-500 text-center mt-6">
              Chỉ sử dụng khi bạn thực sự cần trợ giúp
            </p>
          </div>
        </div>
      )}
    </>
  );
}
