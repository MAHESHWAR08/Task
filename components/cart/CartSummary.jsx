"use client";

import { useCart } from "@/context/CartContext";
import { formatPrice, cn } from "@/lib/utils";
import Button from "@/components/ui/Button";

export default function CartSummary() {
  const { totalItems, totalPrice, clearCart } = useCart();

  const TAX_RATE = 0.08;
  const FREE_SHIPPING_THRESHOLD = 50;
  const SHIPPING_COST = 4.99;

  const tax = totalPrice * TAX_RATE;
  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const orderTotal = totalPrice + tax + shipping;

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl p-6",
        "shadow-sm border border-gray-100 dark:border-gray-700",
        "sticky top-24"
      )}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
        Order Summary
      </h3>

      <div className="space-y-3 text-sm">
        {/* Subtotal */}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Subtotal ({totalItems} items)</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between text-gray-600 dark:text-gray-400">
          <span>Shipping</span>
          {shipping === 0 ? (
            <span className="text-green-500 font-medium">FREE</span>
          ) : (
            <span>{formatPrice(shipping)}</span>
          )}
        </div>

        {/* Free shipping hint */}
        {shipping > 0 && (
          <p className="text-xs text-indigo-600 dark:text-indigo-400">
            Add {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} more for free shipping!
          </p>
        )}

        <hr className="border-gray-200 dark:border-gray-700" />

        {/* Total */}
        <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white pt-1">
          <span>Total</span>
          <span>{formatPrice(orderTotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-3">
        <Button variant="primary" className="w-full" size="lg">
          🛍️ Proceed to Checkout
        </Button>

        <Button
          variant="ghost"
          className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
          onClick={clearCart}
        >
          🗑️ Clear Cart
        </Button>
      </div>
    </div>
  );
}