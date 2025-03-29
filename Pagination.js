// This component handles the pagination of user data.

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1); // Creates an array of page numbers

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex rounded-md shadow">
        {pages.map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 border ${
              currentPage === page
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;