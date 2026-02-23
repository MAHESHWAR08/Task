import { cn } from "@/lib/utils";

export default function Badge({ count, className }) {
  if (!count || count === 0) return null;

  return (
    <span
      className={cn(
        /* ✅ Positioned absolute relative to parent */
        "absolute -top-1.5 -right-1.5",
        "min-w-5 h-5 px-1",
        "flex items-center justify-center",
        "bg-red-500 text-white text-[10px] font-bold rounded-full",
        "pointer-events-none",
        className
      )}
      aria-label={`${count} items in cart`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}