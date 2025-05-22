const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li key={i}>
          <button
            onClick={() => onPageChange(i)}
            className={`flex items-center justify-center px-3 h-8 leading-tight border ${
              currentPage === i
                ? "z-10 text-text border-primary-600 border-x-0  bg-primary-500  "
                : "text-primary-100 bg-primary-900 border-primary-600 hover:bg-primary-800 hover:text-primary-200"
            }`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav aria-label="pagination">
      <ul className="flex h-8 items-center -space-x-px text-sm">
        <li>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-primary-600 bg-primary-900 px-3 leading-tight text-primary-100 hover:bg-primary-800 hover:text-text"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="flex h-8 items-center justify-center rounded-e-lg border border-primary-600 bg-primary-900 px-3 leading-tight text-primary-100 hover:bg-primary-800 hover:text-text"
          >
            <span className="sr-only">Next</span>
            <svg
              className="h-2.5 w-2.5 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
