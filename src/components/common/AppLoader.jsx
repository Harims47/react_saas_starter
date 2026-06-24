import React from "react";

export const AppLoader = ({
  type = "section",
  message = "Loading...",
  className = "",
  ...props
}) => {
  const spinnerElement = (
    <div className="d-flex flex-column align-items-center justify-content-center p-3">
      <div className="spinner-border text-primary mb-2" role="status" style={{ width: "2rem", height: "2rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      {message && <span className="small text-muted fw-semibold">{message}</span>}
    </div>
  );

  if (type === "page") {
    return (
      <div
        className={`min-vh-100 w-100 d-flex align-items-center justify-content-center bg-body ${className}`}
        {...props}
      >
        {spinnerElement}
      </div>
    );
  }

  if (type === "overlay") {
    return (
      <div
        className={`position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-body bg-opacity-75 ${className}`}
        style={{ zIndex: 1050, borderRadius: "inherit" }}
        {...props}
      >
        {spinnerElement}
      </div>
    );
  }

  return (
    <div className={`py-5 w-100 d-flex align-items-center justify-content-center ${className}`} {...props}>
      {spinnerElement}
    </div>
  );
};

export default AppLoader;
