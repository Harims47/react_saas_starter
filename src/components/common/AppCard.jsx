import React from "react";

export const AppCard = ({
  title,
  subtitle,
  actions,
  children,
  footerContent,
  className = "",
  ...props
}) => {
  const hasHeader = title || subtitle || actions;

  return (
    <div className={`card shadow-sm border bg-body ${className}`} {...props}>
      {hasHeader && (
        <div className="card-header bg-transparent py-3 border-bottom d-flex align-items-center justify-content-between">
          <div>
            {title && <h5 className="mb-0 fw-semibold text-body">{title}</h5>}
            {subtitle && <span className="text-muted d-block small mt-1">{subtitle}</span>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">{children}</div>
      {footerContent && (
        <div className="card-footer bg-transparent py-3 border-top">{footerContent}</div>
      )}
    </div>
  );
};

export default AppCard;
