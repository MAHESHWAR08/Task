"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import StarRating from "./StarRating";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

export default function BookCard({ book }) {
  const {
    addToCart,
    isInCart,
    getItemQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);

  const inCart = isInCart(book.id);
  const quantity = getItemQuantity(book.id);

  const handleAddToCart = () => {
    addToCart(book);
    setShowToast(true);
  };

  const handleIncrease = () => {
    increaseQuantity(book.id);
  };

  const handleDecrease = () => {
    decreaseQuantity(book.id);
    // When quantity becomes 0, item is removed from cart
    // isInCart becomes false → "Add to Cart" button reappears
  };

  return (
    <>
      <article
        className={cn(
          "group bg-white dark:bg-gray-800 rounded-xl overflow-hidden",
          "shadow-md hover:shadow-xl",
          "transform hover:-translate-y-1",
          "transition-all duration-300 ease-out",
          "flex flex-col"
        )}
      >
        {/* Book Image */}
        <div className="relative w-full h-64 overflow-hidden bg-gray-100 dark:bg-gray-700">
          {!imgError ? (
            <Image
              src={book.image}
              alt={`Cover of ${book.title}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-4xl">
              📖
            </div>
          )}

          {/* Category Badge */}
          <span
            className={cn(
              "absolute top-3 left-3",
              "px-2.5 py-1 rounded-full",
              "bg-indigo-600/90 text-white text-xs font-medium",
              "backdrop-blur-sm"
            )}
          >
            {book.category}
          </span>

         
        </div>

        {/* Book Info */}
        <div className="p-4 flex flex-col grow">
          <h3 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight mb-1 line-clamp-1">
            {book.title}
          </h3>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            by {book.author}
          </p>

          <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2 mb-3 grow">
            {book.description}
          </p>

          {/* Rating & Price */}
          <div className="flex items-center justify-between mb-3">
            <StarRating rating={book.rating} />
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {formatPrice(book.price)}
            </span>
          </div>

          {/* ✅ Cart Button / Quantity Controls */}
          {!inCart ? (
            /* STATE 1: Show "Add to Cart" button */
            <Button
              onClick={handleAddToCart}
              variant="primary"
              className="w-full"
            >
              🛒 Add to Cart
            </Button>
          ) : (
            /* STATE 2: Show Quantity Controls */
            <div
              className={cn(
                "flex items-center justify-between",
                "border-2 border-indigo-600 dark:border-indigo-400 rounded-lg",
                "overflow-hidden"
              )}
            >
              {/* Decrease Button */}
              <button
                onClick={handleDecrease}
                className={cn(
                  "w-12 h-10 flex items-center justify-center",
                  "bg-indigo-600 dark:bg-indigo-500 text-white",
                  "hover:bg-indigo-700 dark:hover:bg-indigo-600",
                  "transition-colors cursor-pointer",
                  "font-bold text-xl"
                )}
                aria-label={`Decrease quantity of ${book.title}`}
              >
                −
              </button>

              {/* Quantity Display */}
              <span
                className={cn(
                  "flex-1 h-10 flex items-center justify-center",
                  "text-base font-bold",
                  "text-indigo-600 dark:text-indigo-400",
                  "select-none"
                )}
              >
                {quantity}
              </span>

              {/* Increase Button */}
              <button
                onClick={handleIncrease}
                className={cn(
                  "w-12 h-10 flex items-center justify-center",
                  "bg-indigo-600 dark:bg-indigo-500 text-white",
                  "hover:bg-indigo-700 dark:hover:bg-indigo-600",
                  "transition-colors cursor-pointer",
                  "font-bold text-xl"
                )}
                aria-label={`Increase quantity of ${book.title}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </article>

      {/* Toast Notification */}
      <Toast
        message={`"${book.title}" added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </>
  );
}