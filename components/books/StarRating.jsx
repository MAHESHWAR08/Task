import { getStarRating } from "@/lib/utils";

export default function StarRating({ rating }) {
  const { fullStars, hasHalfStar, emptyStars } = getStarRating(rating);

  return (
    <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: fullStars }, (_, i) => (
          <span key={`full-${i}`} className="text-yellow-400 text-sm">★</span>
        ))}

        {hasHalfStar && (
          <span className="text-yellow-400 text-sm">★</span>
        )}

        {Array.from({ length: emptyStars }, (_, i) => (
          <span key={`empty-${i}`} className="text-gray-300 dark:text-gray-600 text-sm">★</span>
        ))}
      </div>

      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
        ({rating})
      </span>
    </div>
  );
}