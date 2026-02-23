import Link from "next/link";
import Button from "./Button";

export default function EmptyState({
  icon = "📭",
  title = "Nothing here",
  description = "",
  actionLabel,
  actionHref,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-6xl mb-4" role="img" aria-hidden="true">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>

      <p className="text-gray-500 dark:text-gray-400 text-center max-w-md mb-6">
        {description}
      </p>

      {actionLabel && actionHref && (
        <Link href={actionHref}>
          <Button variant="primary" size="lg">
            {actionLabel}
          </Button>
        </Link>
      )}
    </div>
  );
}