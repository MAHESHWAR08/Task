import SkeletonCard from "@/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Skeleton */}
      <div className="text-center mb-10 space-y-3">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-64 mx-auto animate-pulse" />
      </div>

      {/* Filter Skeleton */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl w-full max-w-md animate-pulse" />
        <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl w-40 animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }, (_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}