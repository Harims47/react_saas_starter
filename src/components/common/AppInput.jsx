import React, { useState } from "react";

export const AppInput = ({
  label,
  placeholder,
  type = "text",
  required = false,
  error,
  disabled = false,
  icon,
  showPasswordToggle = false,
  value,
  onChange,
  className = "",
  id,
  ...props
}) => {
  const [localShowPassword, setLocalShowPassword] = useState(false);
  const inputId = id || `app-input-${Math.random().toString(36).substring(2, 9)}`;

  const isPassword = type === "password";
  const inputType = isPassword && showPasswordToggle && localShowPassword ? "text" : type;

  let paddingClass = "";
  if (icon && isPassword && showPasswordToggle) {
    paddingClass = "ps-5 pe-5";
  } else if (icon) {
    paddingClass = "ps-5";
  } else if (isPassword && showPasswordToggle) {
    paddingClass = "pe-5";
  }

  return (
    <div className={`mb-3 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label small fw-medium text-body">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="position-relative">
        {icon && (
          <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
            <i className={`bi ${icon}`}></i>
          </span>
        )}

        <input
          type={inputType}
          className={`form-control py-2 ${paddingClass} ${error ? "is-invalid" : ""}`}
          id={inputId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />

        {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-muted"
            onClick={() => setLocalShowPassword(!localShowPassword)}
            disabled={disabled}
          >
            <i className={`bi bi-${localShowPassword ? "eye-slash" : "eye"}`}></i>
          </button>
        )}
      </div>
      {error && <div className="invalid-feedback d-block small mt-1">{error}</div>}
    </div>
  );
};

export default AppInput;
