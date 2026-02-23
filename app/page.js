import BookGrid from "@/components/books/BookGrid";
import books from "@/data/books.json";

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-3">
          Discover Your Next
          <span className="text-indigo-600 dark:text-indigo-400">
            {" "}Great Read
          </span>
        </h1>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Browse our curated collection of books across all genres.
          Find your perfect book today.
        </p>
      </header>

      {/* Book Grid — Client Component */}
      <BookGrid books={books} />
    </div>
  );
}