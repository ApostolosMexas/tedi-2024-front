import React from 'react';
import '../assets/css/components/pagination.css';

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

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className={`page-number${currentPage === 1 ? '-active' : ''}`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`page-number${currentPage === i ? '-active' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className={`page-number${currentPage === totalPages ? '-active' : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      <button
        className={`pagination-button${currentPage === 1 ? '-disabled' : ''}`}
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Προηγούμενο
      </button>
      {renderPageNumbers()}
      <button
        className={`pagination-button${currentPage === totalPages ? '-disabled' : ''}`}
        onClick={handleNext} 
        disabled={currentPage === totalPages}
      >
        Επόμενο
      </button>
    </div>
  );
};

export default Pagination;
