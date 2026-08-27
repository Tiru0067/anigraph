import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipses
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = 4;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 3;
        end = totalPages - 1;
      }

      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10"
      aria-label="Pagination Navigation"
    >
      {/* Prev Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center gap-1 px-3 py-1.75 rounded-lg text-xs font-medium border transition-all ${
          currentPage === 1
            ? "opacity-40 cursor-not-allowed border-background-400/20 text-typography-400 bg-background-200"
            : "cursor-pointer border-background-400/30 text-typography-200 hover:text-typography-100 hover:bg-background-300 bg-background-200"
        }`}
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      {pages.map((pageNum, index) => {
        if (pageNum === "...") {
          return (
            <span
              key={`ellipsis-${index}`}
              className="px-2 py-1 text-xs text-typography-400 select-none"
            >
              ...
            </span>
          );
        }

        const isActive = pageNum === currentPage;
        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            className={`min-w-8.5 h-8.5 flex items-center justify-center rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              isActive
                ? "bg-primary-500 text-typography-000 border-primary-400 shadow-md shadow-primary-500/20"
                : "bg-background-200 border-background-400/30 text-typography-300 hover:text-typography-100 hover:bg-background-300"
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center gap-1 px-3 py-1.75 rounded-lg text-xs font-medium border transition-all ${
          currentPage === totalPages
            ? "opacity-40 cursor-not-allowed border-background-400/20 text-typography-400 bg-background-200"
            : "cursor-pointer border-background-400/30 text-typography-200 hover:text-typography-100 hover:bg-background-300 bg-background-200"
        }`}
        aria-label="Next Page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
};

export default Pagination;
