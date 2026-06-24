import React, { useState } from "react";
import { Link } from "react-router-dom";
import { appConfig } from "../../../config/appConfig";
import { ROUTES } from "../../../constants/routes";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
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
        <h3 className="h3 fw-bold text-body mb-1">Reset Password</h3>
        <p className="text-muted small">Enter your email to receive a recovery link.</p>
      </div>

      {success ? (
        <div className="text-center py-2">
          <div className="text-success fs-2 mb-3">
            <i className="bi bi-envelope-check-fill"></i>
          </div>
          <h5 className="fw-bold mb-2">Check your inbox</h5>
          <p className="text-muted small mb-4">
            We've dispatched a password reset link to <strong>{email}</strong>.
          </p>
          <Link to={ROUTES.LOGIN} className="btn btn-primary w-100 py-2 fw-semibold">
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="forgotEmailInput" className="form-label small fw-medium">
              Email Address
            </label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control ps-5 py-2"
                id="forgotEmailInput"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-4">
            Send Reset Link
          </button>
          
          <div className="text-center">
            <Link to={ROUTES.ROUTES || ROUTES.LOGIN} className="small text-decoration-none fw-semibold">
              Back to Login
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
