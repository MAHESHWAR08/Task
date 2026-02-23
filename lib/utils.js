/**
 * Conditionally join class names
 * (Lightweight alternative to clsx/cn)
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format number as USD currency
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Calculate star breakdown from rating
 */
export function getStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return { fullStars, hasHalfStar, emptyStars };
}

/**
 * Extract unique categories from books
 */
export function getUniqueCategories(books) {
  const categories = [...new Set(books.map((book) => book.category))];
  return ["All", ...categories.sort()];
}

/**
 * Paginate an array
 */
export function paginate(items, currentPage, itemsPerPage) {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    paginatedItems: items.slice(startIndex, endIndex),
    totalPages,
    startIndex,
    endIndex,
  };
}