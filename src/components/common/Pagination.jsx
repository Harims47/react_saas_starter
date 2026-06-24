import React from "react";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className={`d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3 ${className}`}>
      <div className="small text-muted">
        Showing <span className="fw-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)}</span> to{" "}
        <span className="fw-semibold">{Math.min(currentPage * itemsPerPage, totalItems)}</span> of{" "}
        <span className="fw-semibold">{totalItems}</span> records
      </div>
      <ul className="pagination pagination-sm mb-0">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(1)} aria-label="First page">
            <i className="bi bi-chevron-double-left"></i>
          </button>
        </li>
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} aria-label="Previous page">
            <i className="bi bi-chevron-left"></i>
          </button>
        </li>
        
        {getPageNumbers().map((page) => (
          <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
            <button className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} aria-label="Next page">
            <i className="bi bi-chevron-right"></i>
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(totalPages)} aria-label="Last page">
            <i className="bi bi-chevron-double-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
