import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appConfig } from "../../../config/appConfig";
import { ROUTES } from "../../../constants/routes";

export const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
      setError("Passwords do not match. Please check again.");
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
        <h3 className="h3 fw-bold text-body mb-1">Create Account</h3>
        <p className="text-muted small">Register your new SaaS enterprise workspace.</p>
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
          <div>Registration complete! Redirecting to sign in...</div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="row g-2 mb-3">
          <div className="col-6">
            <label htmlFor="firstNameInput" className="form-label small fw-medium">
              First Name
            </label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control ps-5 py-2"
                id="firstNameInput"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="col-6">
            <label htmlFor="lastNameInput" className="form-label small fw-medium">
              Last Name
            </label>
            <div className="position-relative">
              <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control ps-5 py-2"
                id="lastNameInput"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="signupEmailInput" className="form-label small fw-medium">
            Email Address
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control ps-5 py-2"
              id="signupEmailInput"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="signupPasswordInput" className="form-label small fw-medium">
            Password
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control px-5 py-2"
              id="signupPasswordInput"
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
          <label htmlFor="confirmPasswordInput" className="form-label small fw-medium">
            Confirm Password
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control px-5 py-2"
              id="confirmPasswordInput"
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
          Create Account
        </button>
      </form>

      {/* Footer Link */}
      <p className="small text-center text-muted mb-0">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="text-primary text-decoration-none fw-semibold">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Signup;
