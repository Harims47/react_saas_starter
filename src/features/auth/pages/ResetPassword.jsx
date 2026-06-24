import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appConfig } from "../../../config/appConfig";
import { ROUTES } from "../../../constants/routes";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);

    // Mock API delay
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    }, 1000);
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
        <AppInput
          label="New Password"
          placeholder="••••••••"
          type="password"
          icon="bi-lock"
          showPasswordToggle={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading || success}
        />

        <AppInput
          label="Confirm New Password"
          placeholder="••••••••"
          type="password"
          icon="bi-lock-fill"
          showPasswordToggle={true}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          disabled={loading || success}
        />

        <AppButton type="submit" fullWidth={true} loading={loading} disabled={success} className="py-2 mb-4">
          Reset Password
        </AppButton>
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
