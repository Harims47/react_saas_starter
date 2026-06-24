import React from "react";
import AppCard from "../../components/common/AppCard";
import AppButton from "../../components/common/AppButton";
import AppInput from "../../components/common/AppInput";
import AppTable from "../../components/common/AppTable";
import Pagination from "../../components/common/Pagination";

export const ListPageTemplate = ({
  title,
  subtitle,
  createButtonText = "Create New",
  onCreateClick,
  searchQuery,
  onSearchChange,
  filterSection,
  columns,
  data,
  loading,
  sortField,
  sortOrder,
  onSort,
  actions,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  emptyMessage,
}) => {
  return (
    <div className="container-fluid py-2">
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1 text-body">{title}</h2>
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </div>
        {onCreateClick && (
          <AppButton variant="primary" icon="bi-plus-lg" onClick={onCreateClick}>
            {createButtonText}
          </AppButton>
        )}
      </div>

      {/* Main List Container */}
      <AppCard className="border-0 shadow-sm">
        {/* Filters Header Section */}
        <div className="row g-3 mb-4 align-items-end">
          <div className={filterSection ? "col-md-6 col-lg-4" : "col-12"}>
            <AppInput
              placeholder="Search records..."
              icon="bi-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="mb-0"
            />
          </div>
          {filterSection && (
            <div className="col-md-6 col-lg-8">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end">{filterSection}</div>
            </div>
          )}
        </div>

        {/* Dynamic List Table */}
        <AppTable
          columns={columns}
          data={data}
          loading={loading}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={onSort}
          actions={actions}
          emptyMessage={emptyMessage}
        />

        {/* Pagination navigation */}
        {totalItems > 0 && (
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={onPageChange}
            />
          </div>
        )}
      </AppCard>
    </div>
  );
};

export default ListPageTemplate;
