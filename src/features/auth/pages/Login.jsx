import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../../store/slices/authSlice";
import { ROLES } from "../../../constants/roles";
import { PERMISSIONS } from "../../../constants/permissions";
import { ROUTES } from "../../../constants/routes";
import { appConfig } from "../../../config/appConfig";

export const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginSuccess({
        user: {
          name: "Hari Kumar",
          email: email || "admin@saascompany.com",
          roles: [ROLES.ADMIN],
          permissions: [PERMISSIONS.DASHBOARD_VIEW],
        },
        token: "mock-jwt-token-sprint2",
      })
    );
  };

  const handleGoogleLogin = () => {
    dispatch(
      loginSuccess({
        user: {
          name: "Hari Google User",
          email: "googleuser@saascompany.com",
          roles: [ROLES.USER],
          permissions: [PERMISSIONS.DASHBOARD_VIEW],
        },
        token: "mock-google-token-sprint2",
      })
    );
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        {/* Desktop Brand logo (hidden on small viewports because layout shows it header-style) */}
        <div className="d-none d-lg-flex align-items-center mb-4">
          <i className="bi bi-cpu-fill text-primary fs-2 me-2"></i>
          <span className="fw-bold fs-4 text-body" style={{ letterSpacing: "-0.5px" }}>
            {appConfig.appName}
          </span>
        </div>
        <h3 className="h3 fw-bold text-body mb-1">Welcome Back</h3>
        <p className="text-muted small">Please enter your credentials to access your account.</p>
      </div>

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label small fw-medium">
            Email Address
          </label>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control ps-5 py-2"
              id="emailInput"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <label htmlFor="passwordInput" className="form-label small fw-medium mb-0">
              Password
            </label>
            <Link to={ROUTES.FORGOT_PASSWORD} className="small text-decoration-none fw-semibold">
              Forgot Password?
            </Link>
          </div>
          <div className="position-relative">
            <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control px-5 py-2"
              id="passwordInput"
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

        <div className="mb-4 d-flex align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMeCheck"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label className="form-check-label small text-muted" htmlFor="rememberMeCheck">
              Remember me for 30 days
            </label>
          </div>
        </div>

        {/* Buttons */}
        <button type="submit" className="btn btn-primary w-100 py-2 fw-semibold mb-3">
          Sign In
        </button>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1 text-muted opacity-25" />
          <span className="mx-2 small text-muted text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
            Or sign in with
          </span>
          <hr className="flex-grow-1 text-muted opacity-25" />
        </div>

        {/* Google Mock SSO */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center fw-medium mb-4"
        >
          <i className="bi bi-google text-danger me-2"></i>
          Google Account
        </button>
      </form>

      {/* Footer Link */}
      <p className="small text-center text-muted mb-0">
        Don't have an account?{" "}
        <Link to={ROUTES.SIGNUP} className="text-primary text-decoration-none fw-semibold">
          Create Account
        </Link>
      </p>
    </div>
  );
};

export default Login;
