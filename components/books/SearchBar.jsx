"use client";

import { cn } from "@/lib/utils";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      {/* Search Icon */}
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {/* Input */}
      <input
        type="search"
        placeholder="Search by title or author..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Search books"
        className={cn(
          "w-full pl-10 pr-10 py-2.5 rounded-xl",
          "bg-gray-100 dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "placeholder:text-gray-400 dark:placeholder:text-gray-500",
          "border border-transparent",
          "focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
          "transition-all duration-200"
        )}
      />

      {/* Clear Button */}
      {value && (
        <button
          onClick={() => onChange("")}
          className={cn(
            "absolute right-3 top-1/2 -translate-y-1/2",
            "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",
            "transition-colors"
          )}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}