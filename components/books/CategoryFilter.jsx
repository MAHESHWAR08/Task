"use client";

import { cn } from "@/lib/utils";

export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="relative">
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter by category"
        className={cn(
          "px-4 py-2.5 pr-10 rounded-xl",
          "bg-gray-100 dark:bg-gray-800",
          "text-gray-900 dark:text-gray-100",
          "border border-transparent",
          "focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/20",
          "transition-all duration-200",
          "cursor-pointer appearance-none",
          /* ✅ Changed: min-w-[160px] → min-w-40 */
          "min-w-40"
        )}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "All" ? "All Categories" : category}
          </option>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <svg
        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
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
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  );
}