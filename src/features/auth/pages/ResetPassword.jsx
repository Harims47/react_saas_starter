import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appConfig } from "../../../config/appConfig";
import { ROUTES } from "../../../constants/routes";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setSuccess(true);
    setTimeout(() => {
      navigate(ROUTES.LOGIN);
    }, 1500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4">
        {/* Desktop Brand logo */}
        <div className="d-none d-lg-flex align-items-center mb-4">
          <i className="bi bi-cpu-fill text-primary fs-2 me-2"></i>
          <span className="fw-bold fs-4 text-body" style={{ letterSpacing: "-0.5px" }}>
            {appConfig.appName}
          </span>
        </div>
        <h3 className="h3 fw-bold text-body mb-1">Set New Password</h3>
        <p className="text-muted small">Please enter your new secure password below.</p>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small mb-3 d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      )}

      {success && (
        <div className="alert alert-success py-2 px-3 small mb-3 d-flex align-items-center" role="alert">
          <i className="bi bi-check-circle-fill me-2"></i>
          <div>Password changed! Redirecting to login...</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="resetPasswordInput" className="form-label small fw-medium">
            New Password
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control px-5 py-2"
              id="resetPasswordInput"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-muted"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi bi-${showPassword ? "eye-slash" : "eye"}`}></i>
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="resetConfirmPasswordInput" className="form-label small fw-medium">
            Confirm New Password
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control px-5 py-2"
              id="resetConfirmPasswordInput"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="btn position-absolute top-50 end-0 translate-middle-y pe-3 border-0 bg-transparent text-muted"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i className={`bi bi-${showConfirmPassword ? "eye-slash" : "eye"}`}></i>
            </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-4">
          Reset Password
        </button>
      </form>

      {/* Footer Link */}
      <p className="small text-center text-muted mb-0">
        <Link to={ROUTES.LOGIN} className="text-primary text-decoration-none fw-semibold">
          Back to Sign In
        </Link>
      </p>
    </div>
  );
};

export default ResetPassword;
