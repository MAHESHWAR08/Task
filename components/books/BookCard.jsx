"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import StarRating from "./StarRating";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";

export default function BookCard({ book }) {
  const { addToCart, isInCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);

  // ✅ Check if book is already in cart
  const alreadyInCart = isInCart(book.id);

  const handleAddToCart = () => {
    // ✅ Prevent adding if already in cart
    if (alreadyInCart) return;

    addToCart(book);
    setShowToast(true);
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

          {/* ✅ "Added" indicator on image */}
          {alreadyInCart && (
            <span
              className={cn(
                "absolute top-3 right-3",
                "px-2 py-1 rounded-full",
                "bg-green-500 text-white text-xs font-bold",
                "flex items-center gap-1",
                "shadow-md"
              )}
            >
              ✓ Added
            </span>
          )}
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

          {/* ✅ Add to Cart Button — Disabled after one click */}
          <Button
            onClick={handleAddToCart}
            disabled={alreadyInCart}
            variant={alreadyInCart ? "secondary" : "primary"}
            className={cn(
              "w-full",
              alreadyInCart && "cursor-not-allowed opacity-70"
            )}
          >
            {alreadyInCart ? "✅ Added to Cart" : "🛒 Add to Cart"}
          </Button>
        </div>
      </article>

      {/* Toast */}
      <Toast
        message={`"${book.title}" added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        type="success"
      />
    </>
  );
}