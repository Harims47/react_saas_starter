import React from "react";
import AppCard from "../../components/common/AppCard";
import AppButton from "../../components/common/AppButton";

export const DetailsPageTemplate = ({
  title,
  subtitle,
  onEdit,
  onBack,
  editButtonText = "Edit",
  backButtonText = "Back to List",
  metadata = [],
  children,
}) => {
  return (
    <div className="container-fluid py-2">
      {/* Page Header */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-4">
        <div>
          <h2 className="h4 fw-bold mb-1 text-body">{title}</h2>
          {subtitle && <p className="text-muted small mb-0">{subtitle}</p>}
        </div>
        <div className="d-flex gap-2">
          {onBack && (
            <AppButton variant="light" onClick={onBack} icon="bi-arrow-left">
              {backButtonText}
            </AppButton>
          )}
          {onEdit && (
            <AppButton variant="primary" onClick={onEdit} icon="bi-pencil">
              {editButtonText}
            </AppButton>
          )}
        </div>
      </div>

      <div className="row g-4">
        {/* Main Information Cards */}
        <div className={metadata.length > 0 ? "col-lg-8" : "col-12"}>
          <AppCard title="General Details">{children}</AppCard>
        </div>

        {/* Metadata Sidebar Display */}
        {metadata.length > 0 && (
          <div className="col-lg-4">
            <AppCard title="Audit Metadata">
              <ul className="list-group list-group-flush">
                {metadata.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between text-body"
                    style={{ fontSize: "0.85rem" }}
                  >
                    <span className="text-muted fw-semibold">{item.label}:</span>
                    <span className="fw-medium text-end">{item.value}</span>
                  </li>
                ))}
              </ul>
            </AppCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPageTemplate;
