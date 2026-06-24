import React from "react";
import { useTheme } from "../../hooks/useTheme";
import ProfileDropdown from "./ProfileDropdown";

export const Topbar = ({ onToggleSidebar, onToggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="topbar-container app-topbar">
      <div className="d-flex align-items-center">
        {/* Desktop Sidebar Toggle */}
        <button
          className="btn btn-link text-body p-0 me-3 d-none d-lg-inline-block"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar desktop"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-link text-body p-0 me-3 d-lg-none"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle sidebar mobile"
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <span className="h6 mb-0 d-none d-sm-inline-block fw-semibold text-muted">
          SaaS Control Panel
        </span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          className="btn btn-outline-secondary btn-sm border-0 rounded-circle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{ width: "38px", height: "38px", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <i className={`bi bi-${theme === "light" ? "moon-fill" : "sun-fill"} fs-5`}></i>
        </button>

        <div className="vr d-none d-sm-block" style={{ height: "24px" }}></div>

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Topbar;
