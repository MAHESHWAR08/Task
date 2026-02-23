export default function SkeletonCard() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="w-full h-64 bg-gray-200 dark:bg-gray-700" />

      {/* Content placeholder */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />

        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>

        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-full" />
      </div>
    </div>
  );
}