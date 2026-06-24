import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess, loginStart, loginFailure } from "../../../store/slices/authSlice";
import { ROLES } from "../../../constants/roles";
import { PERMISSIONS } from "../../../constants/permissions";
import { ROUTES } from "../../../constants/routes";
import { appConfig } from "../../../config/appConfig";
import AppInput from "../../../components/common/AppInput";
import AppButton from "../../../components/common/AppButton";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());

    // Mock API delay
    setTimeout(() => {
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
    }, 1000);
  };

  const handleGoogleLogin = () => {
    dispatch(loginStart());

    // Mock API delay
    setTimeout(() => {
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
    }, 1000);
  };

  return (
    <div>
      {/* Heading */}
      <div className="mb-4">
        {/* Desktop Brand logo */}
        <div className="d-none d-lg-flex align-items-center mb-4">
          <i className="bi bi-cpu-fill text-primary fs-2 me-2"></i>
          <span className="fw-bold fs-4 text-body" style={{ letterSpacing: "-0.5px" }}>
            {appConfig.appName}
          </span>
        </div>
        <h3 className="h3 fw-bold text-body mb-1">Welcome Back</h3>
        <p className="text-muted small">Please enter your credentials to access your account.</p>
      </div>

      {error && (
        <div className="alert alert-danger py-2 px-3 small mb-3 d-flex align-items-center" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>{error}</div>
        </div>
      )}

      {/* Login form */}
      <form onSubmit={handleSubmit}>
        <AppInput
          label="Email Address"
          placeholder="name@company.com"
          type="email"
          icon="bi-envelope"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <div className="mb-3">
          <div className="d-flex justify-content-between mb-1">
            <span className="form-label small fw-medium mb-0">Password</span>
            <Link to={ROUTES.FORGOT_PASSWORD} className="small text-decoration-none fw-semibold">
              Forgot Password?
            </Link>
          </div>
          <AppInput
            placeholder="••••••••"
            type="password"
            icon="bi-lock"
            showPasswordToggle={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="mb-0" // Reset standard input spacing as we wrapper customized header above
          />
        </div>

        <div className="mb-4 d-flex align-items-center">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="rememberMeCheck"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={loading}
            />
            <label className="form-check-label small text-muted" htmlFor="rememberMeCheck">
              Remember me for 30 days
            </label>
          </div>
        </div>

        {/* Buttons */}
        <AppButton type="submit" fullWidth={true} loading={loading} className="py-2 mb-3">
          Sign In
        </AppButton>

        {/* Divider */}
        <div className="d-flex align-items-center my-3">
          <hr className="flex-grow-1 text-muted opacity-25" />
          <span className="mx-2 small text-muted text-uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.5px" }}>
            Or sign in with
          </span>
          <hr className="flex-grow-1 text-muted opacity-25" />
        </div>

        {/* Google Mock SSO */}
        <AppButton
          type="button"
          variant="outline-secondary"
          fullWidth={true}
          onClick={handleGoogleLogin}
          disabled={loading}
          icon="bi-google"
          className="py-2 mb-4 text-body text-opacity-75"
        >
          Google Account
        </AppButton>
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
