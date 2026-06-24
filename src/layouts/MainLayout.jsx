import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

export const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarShow, setMobileSidebarShow] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarShow((prev) => !prev);
  };

  const handleCloseMobileSidebar = () => {
    setMobileSidebarShow(false);
  };

  return (
    <div className="app-wrapper">
      <Sidebar
        collapsed={sidebarCollapsed}
        mobileShow={mobileSidebarShow}
        onCloseMobile={handleCloseMobileSidebar}
      />

      <div className="main-container">
        <Topbar
          onToggleSidebar={handleToggleSidebar}
          onToggleMobileSidebar={handleToggleMobileSidebar}
        />

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
