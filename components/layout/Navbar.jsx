"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { totalItems } = useCart();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (saved === "dark" || (!saved && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newValue = !isDark;
    setIsDark(newValue);

    if (newValue) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <nav
      className={cn(
        "sticky top-0 z-40",
        "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md",
        "border-b border-gray-200 dark:border-gray-800"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl" aria-hidden="true">📚</span>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Book<span className="text-indigo-600 dark:text-indigo-400">Store</span>
            </span>
          </Link>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={toggleDarkMode}
                className={cn(
                  "p-2 rounded-lg transition-colors duration-200",
                  "hover:bg-gray-100 dark:hover:bg-gray-800",
                  "text-gray-600 dark:text-gray-300 cursor-pointer"
                )}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                <span className="text-xl">{isDark ? "☀️" : "🌙"}</span>
              </button>
            )}

            {/* ✅ Cart Icon — Badge is INLINE, no separate component */}
            <Link
              href="/cart"
              className={cn(
                "relative p-2 rounded-lg transition-colors duration-200",
                "hover:bg-gray-100 dark:hover:bg-gray-800",
                "text-gray-600 dark:text-gray-300"
              )}
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              {/* Cart SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                />
              </svg>

              {/* ✅ Inline Badge — Only shows when items > 0 */}
              {totalItems > 0 && (
                <span
                  className={cn(
                    "absolute -top-0.5 -right-0.5",
                    "min-w-5 h-5 px-1",
                    "flex items-center justify-center",
                    "bg-red-500 text-white text-[10px] font-bold rounded-full",
                    "pointer-events-none"
                  )}
                >
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}