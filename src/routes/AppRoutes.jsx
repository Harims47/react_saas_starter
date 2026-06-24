import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import Login from "../features/auth/pages/Login";
import Signup from "../features/auth/pages/Signup";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Dashboard from "../features/dashboard/pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth paths */}
        <Route
          element={
            <PublicRoute>
              <AuthLayout />
            </PublicRoute>
          }
        >
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />
        </Route>

        {/* Protected app paths */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          
          <Route
            path="/settings"
            element={
              <div className="card p-4 bg-body border shadow-sm">
                <h4 className="fw-bold mb-2">Settings Console</h4>
                <p className="text-muted mb-0">Centralized system variables and configurations.</p>
              </div>
            }
          />
          <Route
            path="/masters"
            element={
              <div className="card p-4 bg-body border shadow-sm">
                <h4 className="fw-bold mb-2">Masters Setup</h4>
                <p className="text-muted mb-0">Add, edit, or remove lookup dictionary masters.</p>
              </div>
            }
          />
        </Route>

        {/* Root redirect */}
        <Route
          path={ROUTES.ROOT}
          element={<Navigate to={ROUTES.DASHBOARD} replace />}
        />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <div className="container py-5 text-center">
              <i className="bi bi-exclamation-triangle-fill text-warning fs-1 mb-3"></i>
              <h1 className="h3 fw-bold">Page Not Found</h1>
              <p className="text-muted">The resource you requested could not be located.</p>
              <a href={ROUTES.ROOT} className="btn btn-primary mt-2">
                Return Home
              </a>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
