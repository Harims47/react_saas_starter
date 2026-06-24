import React from "react";

export const AppButton = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
  ...props
}) => {
  const sizeClass = size === "sm" ? "btn-sm" : size === "lg" ? "btn-lg" : "";
  const widthClass = fullWidth ? "w-100" : "";
  const variantClass = `btn-${variant}`;

  return (
    <button
      type={type}
      className={`btn ${variantClass} ${sizeClass} ${widthClass} d-inline-flex align-items-center justify-content-center fw-semibold ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          <span>{children || "Loading..."}</span>
        </>
      ) : (
        <>
          {icon && <i className={`bi ${icon} ${children ? "me-2" : ""}`}></i>}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

export default AppButton;
