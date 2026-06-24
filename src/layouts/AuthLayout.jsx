import React from "react";
import { Outlet } from "react-router-dom";
import { appConfig } from "../config/appConfig";

export const AuthLayout = () => {
  return (
    <div className="auth-split-wrapper">
      {/* Left Column: Input Form Viewport */}
      <div className="auth-form-column">
        {/* Responsive Brand Header (Visible only on mobile/tablet) */}
        <div className="d-flex align-items-center mb-5 d-lg-none">
          <i className="bi bi-cpu-fill text-primary fs-2 me-2"></i>
          <h2 className="fw-bold mb-0 text-body" style={{ letterSpacing: "-0.5px" }}>
            {appConfig.appName}
          </h2>
        </div>
        
        <div className="auth-card-wrapper">
          <Outlet />
        </div>
      </div>

      {/* Right Column: Premium Marketing Viewport (Hidden on Mobile/Tablet) */}
      <div className="auth-marketing-column">
        <div style={{ maxWidth: "560px", width: "100%" }}>
          {/* Badge */}
          <div className="marketing-badge">
            <i className="bi bi-shield-check me-2"></i>
            Enterprise {appConfig.appName} Portal
          </div>
          
          <h1 className="display-6 fw-bold mb-3" style={{ letterSpacing: "-0.5px", lineHeight: "1.2" }}>
            {appConfig.marketingHeading}
          </h1>
          
          <p className="text-white-50 mb-4 lh-base" style={{ fontSize: "1.05rem" }}>
            {appConfig.marketingSubheading}
          </p>

          {/* Premium Vector Mockup illustration panel */}
          <div className="illustration-box">
            
            {/* Mock Dashboard Header */}
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-white border-opacity-10 pb-2">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-primary me-2" style={{ width: "8px", height: "8px" }}></div>
                <div className="bg-white bg-opacity-25 rounded" style={{ width: "80px", height: "5px" }}></div>
              </div>
              <div className="d-flex gap-2">
                <div className="bg-white bg-opacity-10 rounded-circle" style={{ width: "12px", height: "12px" }}></div>
                <div className="bg-white bg-opacity-10 rounded-circle" style={{ width: "12px", height: "12px" }}></div>
              </div>
            </div>

            {/* 3 Statistic Mock Cards */}
            <div className="row g-2 mb-4">
              <div className="col-4">
                <div className="p-2 rounded bg-white bg-opacity-5 border border-white border-opacity-10">
                  <div className="text-white-50 mb-1" style={{ fontSize: "0.65rem" }}>
                    <i className="bi bi-people-fill me-1 text-primary"></i>Active Users
                  </div>
                  <div className="fw-bold text-white small">14,285</div>
                  <span className="text-success" style={{ fontSize: "0.55rem" }}>
                    <i className="bi bi-arrow-up-short"></i>+12.4%
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 rounded bg-white bg-opacity-5 border border-white border-opacity-10">
                  <div className="text-white-50 mb-1" style={{ fontSize: "0.65rem" }}>
                    <i className="bi bi-currency-dollar me-1 text-success"></i>Monthly M.R.R
                  </div>
                  <div className="fw-bold text-white small">$68,450</div>
                  <span className="text-success" style={{ fontSize: "0.55rem" }}>
                    <i className="bi bi-arrow-up-short"></i>+8.2%
                  </span>
                </div>
              </div>
              <div className="col-4">
                <div className="p-2 rounded bg-white bg-opacity-5 border border-white border-opacity-10">
                  <div className="text-white-50 mb-1" style={{ fontSize: "0.65rem" }}>
                    <i className="bi bi-lightning-charge-fill me-1 text-warning"></i>Conversions
                  </div>
                  <div className="fw-bold text-white small">5.82%</div>
                  <span className="text-danger" style={{ fontSize: "0.55rem" }}>
                    <i className="bi bi-arrow-down-short"></i>-0.2%
                  </span>
                </div>
              </div>
            </div>

            {/* Chart Mockup Area */}
            <div className="p-3 rounded bg-white bg-opacity-5 border border-white border-opacity-10">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="bg-white bg-opacity-25 rounded" style={{ width: "120px", height: "6px" }}></div>
                <div className="bg-white bg-opacity-10 rounded" style={{ width: "40px", height: "5px" }}></div>
              </div>
              
              {/* Bars chart */}
              <div className="d-flex align-items-end justify-content-between pt-2" style={{ height: "100px" }}>
                <div className="bg-primary bg-opacity-25 rounded-top" style={{ height: "35%", width: "8%" }}></div>
                <div className="bg-primary bg-opacity-25 rounded-top" style={{ height: "45%", width: "8%" }}></div>
                <div className="bg-primary bg-opacity-25 rounded-top" style={{ height: "30%", width: "8%" }}></div>
                <div className="bg-primary bg-opacity-50 rounded-top" style={{ height: "65%", width: "8%" }}></div>
                <div className="bg-primary bg-opacity-25 rounded-top" style={{ height: "50%", width: "8%" }}></div>
                <div className="bg-primary bg-opacity-75 rounded-top" style={{ height: "85%", width: "8%" }}></div>
                <div className="bg-primary rounded-top" style={{ height: "100%", width: "8%" }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Small branding footer */}
        <div className="position-absolute bottom-0 start-0 p-5 text-white-50 small">
          &copy; {new Date().getFullYear()} {appConfig.appName}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
