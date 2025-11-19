import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Project Pagination">
      <ul className="flex items-center gap-2">
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="rounded-lg bg-gray-800/70 px-1.5 py-2.5 text-gray-200 hover:bg-indigo-600/30 disabled:opacity-40"
          >
            <FiChevronLeft />
          </button>
        </li>
        {pages.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                p === currentPage
                  ? "bg-indigo-600/70 text-white shadow-sm"
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/70"
              }`}
            >
              {p}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="rounded-lg bg-gray-800/70 px-1.5 py-2.5 text-gray-200 hover:bg-indigo-600/30 disabled:opacity-40"
          >
            <FiChevronRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
