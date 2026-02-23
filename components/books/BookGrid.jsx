"use client";

import { useState, useMemo } from "react";
import BookCard from "./BookCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import Pagination from "./Pagination";
import EmptyState from "@/components/ui/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";
import { getUniqueCategories, paginate } from "@/lib/utils";

const ITEMS_PER_PAGE = 4;

export default function BookGrid({ books }) {
  // ── State ──────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Debounced search ───────────────
  const debouncedSearch = useDebounce(searchQuery, 300);

  // ── Categories (memoized) ──────────
  const categories = useMemo(
    () => getUniqueCategories(books),
    [books]
  );

  // ── Filtered books (memoized) ──────
  const filteredBooks = useMemo(() => {
    const query = debouncedSearch.toLowerCase().trim();

    return books.filter((book) => {
      const matchesSearch =
        !query ||
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);

      const matchesCategory =
        selectedCategory === "All" || book.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [books, debouncedSearch, selectedCategory]);

  // ── Paginated books (memoized) ─────
  const { paginatedItems, totalPages } = useMemo(
    () => paginate(filteredBooks, currentPage, ITEMS_PER_PAGE),
    [filteredBooks, currentPage]
  );

  // ── Handlers ───────────────────────
  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setCurrentPage(1);
  };

  const hasActiveFilters = searchQuery || selectedCategory !== "All";

  return (
    <section className="space-y-6">
      {/* ── Filter Bar ──────────────── */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />
      </div>

      {/* ── Results Info ────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {paginatedItems.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {filteredBooks.length}
          </span>{" "}
          books
        </p>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline focus:outline-none cursor-pointer"
          >
            ✕ Clear Filters
          </button>
        )}
      </div>

      {/* ── Book Grid / Empty State ─── */}
      {paginatedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedItems.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="🔍"
          title="No books found"
          description="Try adjusting your search query or changing the category filter."
        />
      )}

      {/* ── Pagination ──────────────── */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </section>
  );
}