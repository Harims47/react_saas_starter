import React from "react";
import AppLoader from "./AppLoader";

export const AppTable = ({
  columns = [],
  data = [],
  loading = false,
  sortField = "",
  sortOrder = "asc",
  onSort,
  actions,
  emptyMessage = "No records found.",
}) => {
  const handleSortClick = (col) => {
    if (col.sortable && onSort) {
      onSort(col.accessor);
    }
  };

  return (
    <div className="position-relative border rounded overflow-hidden">
      {/* Loading Overlay */}
      {loading && <AppLoader type="overlay" message="Updating records..." />}

      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0" style={{ fontSize: "0.875rem" }}>
          <thead>
            <tr>
              {columns.map((col, index) => {
                const isSortable = col.sortable;
                const isCurrentSort = sortField === col.accessor;
                
                return (
                  <th
                    key={index}
                    scope="col"
                    onClick={() => handleSortClick(col)}
                    style={{ cursor: isSortable ? "pointer" : "default", whiteSpace: "nowrap" }}
                    className="py-3 px-4"
                  >
                    <div className="d-flex align-items-center">
                      <span>{col.header}</span>
                      {isSortable && (
                        <span className="ms-1">
                          {isCurrentSort ? (
                            sortOrder === "asc" ? (
                              <i className="bi bi-arrow-up sort-indicator sort-indicator-active"></i>
                            ) : (
                              <i className="bi bi-arrow-down sort-indicator sort-indicator-active"></i>
                            )
                          ) : (
                            <i className="bi bi-arrow-down-up sort-indicator opacity-50"></i>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
              {actions && <th scope="col" className="py-3 px-4 text-end">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {!loading && data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="text-center py-5 text-muted"
                >
                  <i className="bi bi-inbox fs-2 d-block mb-2 text-muted opacity-50"></i>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const value = row[col.accessor];
                    return (
                      <td key={colIndex} className="px-4 py-3">
                        {col.render ? col.render(row) : value}
                      </td>
                    );
                  })}
                  {actions && (
                    <td className="px-4 py-3 text-end">
                      <div className="d-inline-flex gap-2 justify-content-end">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppTable;
