import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { menuConfig } from "../../app/menuConfig";
import { usePermission } from "../../hooks/usePermission";
import { appConfig } from "../../config/appConfig";
import NavItem from "./NavItem";

export const Sidebar = ({ collapsed, mobileShow, onCloseMobile, onToggleSidebar }) => {
  const { hasPermission, hasAnyRole } = usePermission();
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage open sub-menus
  const [openSubMenus, setOpenSubMenus] = useState({});

  // Auto-expand parent menus if a child page is active
  useEffect(() => {
    const initialOpenStates = {};
    menuConfig.forEach((item) => {
      if (item.section) {
        item.items.forEach((subItem) => {
          if (subItem.children) {
            const hasActiveChild = subItem.children.some(
              (child) => location.pathname === child.path
            );
            if (hasActiveChild) {
              initialOpenStates[subItem.title] = true;
            }
          }
        });
      } else if (item.children) {
        const hasActiveChild = item.children.some(
          (child) => location.pathname === child.path
        );
        if (hasActiveChild) {
          initialOpenStates[item.title] = true;
        }
      }
    });
    setOpenSubMenus((prev) => ({ ...prev, ...initialOpenStates }));
  }, [location.pathname]);

  const toggleSubMenu = (title) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Filter sections and items based on roles and permissions
  const filteredMenu = menuConfig
    .map((item) => {
      if (item.section) {
        const filteredItems = item.items.filter((subItem) => {
          const roleGranted = subItem.roles ? hasAnyRole(subItem.roles) : true;
          const permissionGranted = subItem.permission ? hasPermission(subItem.permission) : true;
          return roleGranted && permissionGranted;
        });

        if (filteredItems.length === 0) return null;
        return {
          ...item,
          items: filteredItems,
        };
      }

      const roleGranted = item.roles ? hasAnyRole(item.roles) : true;
      const permissionGranted = item.permission ? hasPermission(item.permission) : true;
      if (roleGranted && permissionGranted) return item;
      return null;
    })
    .filter(Boolean);

  if (!user) return null;

  const renderMenuItem = (item, index) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = !!openSubMenus[item.title];
    const isParentActive = hasChildren && item.children.some((child) => location.pathname === child.path);

    if (hasChildren) {
      return (
        <div key={index} className="w-100">
          <div
            className={`nav-item-custom d-flex align-items-center ${
              collapsed ? "justify-content-center" : "justify-content-between"
            } ${isParentActive ? "active" : ""}`}
            onClick={() => toggleSubMenu(item.title)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex align-items-center">
              <i className={`bi ${item.icon} nav-item-icon`}></i>
              {!collapsed && <span className="nav-item-text">{item.title}</span>}
            </div>
            {!collapsed && (
              <i
                className={`bi bi-chevron-${isOpen ? "down" : "right"} text-muted`}
                style={{ fontSize: "0.75rem", transition: "transform 0.2s" }}
              ></i>
            )}
          </div>
          {!collapsed && isOpen && (
            <div className="nav-submenu-list" style={{ display: "block" }}>
              {item.children.map((child, idx) => (
                <NavItem key={idx} item={child} isSubItem={true} />
              ))}
            </div>
          )}
        </div>
      );
    }

    return <NavItem key={index} item={item} />;
  };

  return (
    <>
      {/* Mobile backdrop overlay */}
      {mobileShow && (
        <div className="sidebar-overlay d-lg-none" onClick={onCloseMobile}></div>
      )}

      <aside
        className={`sidebar-container ${collapsed ? "collapsed" : ""} ${
          mobileShow ? "show" : ""
        }`}
      >
        {/* Brand Header */}
        <div
          className="d-flex align-items-center px-4"
          style={{ 
            height: "var(--topbar-height)",
            borderBottom: "1px solid var(--sidebar-border)" 
          }}
        >
          <div className="d-flex align-items-center min-w-0 w-100">
            {/* Hexagon Brand Logo */}
            <div 
              className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-3 me-2 flex-shrink-0"
              style={{ width: "32px", height: "32px" }}
            >
              <i className="bi bi-hexagon-fill text-primary fs-5"></i>
            </div>
            {!collapsed && (
              <span 
                className="fw-bold fs-5 text-truncate d-block" 
                style={{ 
                  color: "var(--sidebar-hover-text)", 
                  letterSpacing: "-0.5px",
                  flexGrow: 1,
                  minWidth: 0
                }}
              >
                {appConfig.appName}
              </span>
            )}
          </div>
        </div>

        {/* Navigation items list */}
        <nav className="flex-grow-1 py-3 overflow-y-auto">
          {filteredMenu.map((item, index) => {
            if (item.section) {
              return (
                <div key={index} className="mb-3">
                  {!collapsed ? (
                    <div className="sidebar-section-header">
                      {item.section}
                    </div>
                  ) : (
                    <hr className="my-3 mx-3" style={{ borderTop: "1px solid var(--sidebar-border)", opacity: 1 }} />
                  )}
                  {item.items.map((subItem, idx) => renderMenuItem(subItem, idx))}
                </div>
              );
            }
            return renderMenuItem(item, index);
          })}
        </nav>

        {/* Sidebar Settings Button */}
        <div 
          className="sidebar-settings-button"
          style={{ borderTop: "1px solid var(--sidebar-border)" }}
        >
          <button
            onClick={() => navigate("/settings")}
            className="btn w-100 py-3 text-start d-flex align-items-center px-4 border-0 text-decoration-none"
            style={{ 
              fontSize: "0.875rem",
              color: "var(--text-muted)",
              transition: "all 0.15s ease",
              justifyContent: collapsed ? "center" : "flex-start"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--sidebar-hover-text)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
          >
            <i className={`bi bi-gear-fill fs-5 ${collapsed ? "" : "me-2"}`}></i>
            {!collapsed && <span className="fw-medium">Settings</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
