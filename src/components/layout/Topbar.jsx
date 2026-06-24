import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import ProfileDropdown from "./ProfileDropdown";

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    title: "CRM Lead Assigned",
    description: "New lead 'Acrocorp Ltd' assigned to your workspace.",
    time: "10m ago",
    icon: "bi-person-plus-fill",
    bgClass: "bg-primary bg-opacity-10 text-primary"
  },
  {
    id: 2,
    title: "Clinic Reservation",
    description: "Patient John Doe confirmed appointment for 3:00 PM.",
    time: "1h ago",
    icon: "bi-calendar-check-fill",
    bgClass: "bg-success bg-opacity-10 text-success"
  },
  {
    id: 3,
    title: "ERP System Update",
    description: "Modular School ERP core updated to v2.4.0.",
    time: "Yesterday",
    icon: "bi-cpu-fill",
    bgClass: "bg-warning bg-opacity-10 text-warning"
  }
];

export const Topbar = ({ collapsed, onToggleSidebar, onToggleMobileSidebar }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [hasUnread, setHasUnread] = useState(true);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getBreadcrumbs = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard";
    if (path === "/masters") return "Masters List";
    if (path === "/settings") return "Settings Console";
    return "Overview";
  };

  return (
    <header className="topbar-container app-topbar">
      <div className="d-flex align-items-center gap-3">
        {/* Desktop Sidebar Toggle */}
        <button
          className="btn btn-link text-muted p-0 d-none d-lg-inline-block border-0"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar desktop"
          style={{ transition: "color 0.15s ease" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--sidebar-hover-text)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <i className={`bi bi-text-indent-${collapsed ? "right" : "left"} fs-4`}></i>
        </button>

        {/* Mobile Sidebar Toggle */}
        <button
          className="btn btn-link text-muted p-0 d-lg-none border-0"
          onClick={onToggleMobileSidebar}
          aria-label="Toggle sidebar mobile"
          style={{ transition: "color 0.15s ease" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--sidebar-hover-text)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav aria-label="breadcrumb" className="d-none d-md-block">
          <ol className="breadcrumb mb-0 align-items-center" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
            <li className="breadcrumb-item text-muted">Workspace</li>
            <li className="breadcrumb-item active fw-semibold" style={{ color: "var(--sidebar-hover-text)" }} aria-current="page">
              {getBreadcrumbs()}
            </li>
          </ol>
        </nav>
      </div>

      {/* Center Search Bar */}
      <div className="topbar-search-container d-none d-sm-flex">
        <i className="bi bi-search text-muted fs-6"></i>
        <input
          ref={searchInputRef}
          type="text"
          className="topbar-search-input"
          placeholder="Search or type shortcut..."
          aria-label="Search"
        />
        <span className="search-shortcut">⌘K</span>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Theme Toggle Button */}
        <button
          className="btn btn-outline-secondary btn-sm border-0 rounded-circle"
          onClick={toggleTheme}
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          style={{ 
            width: "38px", 
            height: "38px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            color: "var(--text-muted)",
            transition: "all 0.15s ease" 
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = "var(--sidebar-hover-text)"}
          onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
        >
          <i className={`bi bi-${theme === "light" ? "moon-fill" : "sun-fill"} fs-5`}></i>
        </button>

        {/* Notifications Bell Dropdown */}
        <div className="dropdown">
          <button
            className="btn btn-outline-secondary btn-sm border-0 rounded-circle position-relative"
            type="button"
            id="notificationsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            onClick={() => setHasUnread(false)}
            style={{ 
              width: "38px", 
              height: "38px", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center",
              color: "var(--text-muted)",
              transition: "all 0.15s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--sidebar-hover-text)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <i className="bi bi-bell-fill fs-5"></i>
            {hasUnread && <span className="notification-badge"></span>}
          </button>
          
          <ul className="dropdown-menu dropdown-menu-end notification-dropdown shadow border" aria-labelledby="notificationsDropdown">
            <div className="notification-header">
              <span className="fw-bold" style={{ fontSize: "0.875rem", color: "var(--sidebar-hover-text)" }}>Notifications</span>
              <button 
                className="btn btn-link p-0 text-decoration-none small" 
                style={{ fontSize: "0.75rem", color: "var(--sidebar-active-text)" }} 
                onClick={() => setHasUnread(false)}
              >
                Mark all as read
              </button>
            </div>
            <div className="notification-list">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <li key={notif.id}>
                  <a href={`#notif-${notif.id}`} className="notification-item">
                    <div className={`notification-item-icon ${notif.bgClass}`}>
                      <i className={`bi ${notif.icon}`}></i>
                    </div>
                    <div className="notification-item-content">
                      <div className="notification-item-title">{notif.title}</div>
                      <div className="notification-item-desc">{notif.description}</div>
                      <div className="notification-item-time">{notif.time}</div>
                    </div>
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>

        <div className="vr d-none d-sm-block text-muted opacity-25" style={{ height: "20px" }}></div>

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Topbar;
