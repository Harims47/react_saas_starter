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
  kpis, // Optional KPI metrics cards array
}) => {
  return (
    <div className="container-fluid py-2 px-0">
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1 text-body" style={{ color: "var(--sidebar-hover-text)" }}>{title}</h2>
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </div>
        {onCreateClick && (
          <AppButton variant="primary" icon="bi-plus-lg" onClick={onCreateClick}>
            {createButtonText}
          </AppButton>
        )}
      </div>

      {/* KPI Cards Section */}
      {kpis && kpis.length > 0 && (
        <div className="row g-3 mb-4">
          {kpis.map((kpi, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-3">
              <div className="card p-3 h-100 border shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <span className="text-muted small fw-semibold text-uppercase d-block mb-1" style={{ fontSize: "0.675rem", letterSpacing: "0.05em" }}>
                      {kpi.title}
                    </span>
                    <span className="h4 fw-bold mb-0" style={{ color: "var(--sidebar-hover-text)" }}>
                      {kpi.value}
                    </span>
                  </div>
                  <div 
                    className={`rounded-3 ${kpi.bgClass || 'bg-primary bg-opacity-10'} ${kpi.color || 'text-primary'}`} 
                    style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <i className={`bi ${kpi.icon} fs-5`}></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main List Container */}
      <AppCard className="border shadow-sm p-4">
        {/* Filters Header Section */}
        <div className="row g-3 mb-4 align-items-center">
          <div className="col-12 col-md-4">
            <AppInput
              placeholder="Search records..."
              icon="bi-search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="mb-0"
            />
          </div>
          {filterSection && (
            <div className="col-12 col-md-8">
              <div className="d-flex flex-wrap gap-2 justify-content-md-end align-items-center">
                {filterSection}
              </div>
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
