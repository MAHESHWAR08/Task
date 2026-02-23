export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>
            📚 BookStore — Built with Next.js 15, React 19, Tailwind CSS 4
          </p>
          <p className="mt-1">© {currentYear} All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}