"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartItem({ item }) {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [imgError, setImgError] = useState(false);

  const itemTotal = item.price * item.quantity;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center gap-4",
        "bg-white dark:bg-gray-800 rounded-xl p-4",
        "shadow-sm border border-gray-100 dark:border-gray-700",
        "transition-all duration-200 hover:shadow-md"
      )}
    >
      {/* Book Image */}
      {/* ✅ Changed: flex-shrink-0 → shrink-0 */}
      <div className="relative w-20 h-28 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-700">
        {!imgError ? (
          <Image
            src={item.image}
            alt={`Cover of ${item.title}`}
            fill
            sizes="80px"
            className="object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            📖
          </div>
        )}
      </div>

      {/* Book Details */}
      {/* ✅ Changed: flex-grow → grow */}
      <div className="grow min-w-0">
        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          by {item.author}
        </p>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
          {formatPrice(item.price)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3">
        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
          <button
            onClick={() => decreaseQuantity(item.id)}
            className={cn(
              "w-9 h-9 flex items-center justify-center",
              "text-gray-600 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "transition-colors cursor-pointer",
              "font-bold text-lg"
            )}
            aria-label={`Decrease quantity of ${item.title}`}
          >
            −
          </button>

          <span
            className={cn(
              "w-10 h-9 flex items-center justify-center",
              "text-sm font-semibold",
              "text-gray-900 dark:text-white",
              "border-x border-gray-200 dark:border-gray-600",
              "select-none"
            )}
            aria-label={`Quantity: ${item.quantity}`}
          >
            {item.quantity}
          </span>

          <button
            onClick={() => increaseQuantity(item.id)}
            className={cn(
              "w-9 h-9 flex items-center justify-center",
              "text-gray-600 dark:text-gray-300",
              "hover:bg-gray-100 dark:hover:bg-gray-700",
              "transition-colors cursor-pointer",
              "font-bold text-lg"
            )}
            aria-label={`Increase quantity of ${item.title}`}
          >
            +
          </button>
        </div>
      </div>

      {/* Item Total */}
      {/* ✅ Changed: min-w-[80px] → min-w-20 */}
      <div className="text-right min-w-20">
        <p className="font-bold text-gray-900 dark:text-white">
          {formatPrice(itemTotal)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeFromCart(item.id)}
        className="text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
        aria-label={`Remove ${item.title} from cart`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </Button>
    </div>
  );
}