"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";

export default function Toast({
  message,
  isVisible,
  onClose,
  type = "success",
  duration = 2500,
}) {
  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [isVisible, onClose, duration]);

  if (!isVisible) return null;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
  };

  const colors = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  return (
    <div
      role="alert"
      className={cn(
        "fixed bottom-6 right-6 z-50",
        "px-5 py-3 rounded-lg shadow-lg",
        "flex items-center gap-2",
        /* ✅ Changed: animate-[slide-up_0.3s_ease-out] → animate-slide-up */
        "animate-slide-up",
        colors[type]
      )}
    >
      <span aria-hidden="true">{icons[type]}</span>
      <span className="font-medium text-sm">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  );
}