import React from "react";
import { menuConfig } from "../../app/menuConfig";
import { usePermission } from "../../hooks/usePermission";
import { appConfig } from "../../config/appConfig";
import NavItem from "./NavItem";

export const Sidebar = ({ collapsed, mobileShow, onCloseMobile }) => {
  const { hasPermission, hasAnyRole } = usePermission();

  const filteredMenuItems = menuConfig.filter((item) => {
    const roleGranted = item.roles ? hasAnyRole(item.roles) : true;
    const permissionGranted = item.permission ? hasPermission(item.permission) : true;
    return roleGranted && permissionGranted;
  });

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
          className="d-flex align-items-center px-3 border-bottom"
          style={{ height: "var(--topbar-height)" }}
        >
          <i className="bi bi-cpu-fill text-primary fs-3 me-2"></i>
          {!collapsed && (
            <span className="fw-bold fs-5 text-truncate">
              {appConfig.appName}
            </span>
          )}
        </div>

        {/* Navigation items list */}
        <nav className="flex-grow-1 py-3 overflow-y-auto">
          {filteredMenuItems.map((item, index) => (
            <NavItem key={index} item={item} />
          ))}
        </nav>

        {/* Sidebar Footer */}
        {!collapsed && (
          <div className="p-3 border-top text-center small text-muted text-truncate">
            &copy; {new Date().getFullYear()} SaaS Platform
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
