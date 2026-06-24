import React from "react";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container-fluid">
      <div className="row g-4">
        {/* Welcome Card */}
        <div className="col-12">
          <div className="card shadow-sm border p-4 bg-body">
            <h2 className="h4 fw-bold mb-1">Welcome back, {user?.name || "User"}!</h2>
            <p className="text-muted mb-0">Here's a quick look at your SaaS control center.</p>
          </div>
        </div>

        {/* User Information */}
        <div className="col-md-6">
          <div className="card shadow-sm border h-100 bg-body">
            <div className="card-header bg-transparent py-3 border-bottom">
              <h5 className="mb-0 fw-semibold text-primary">
                <i className="bi bi-person-badge-fill me-2"></i>User Session Metadata
              </h5>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between">
                  <span className="text-muted fw-medium">User Name:</span>
                  <span className="fw-semibold">{user?.name || "Anonymous"}</span>
                </li>
                <li className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between">
                  <span className="text-muted fw-medium">Email Address:</span>
                  <span className="fw-semibold">{user?.email || "none"}</span>
                </li>
                <li className="list-group-item bg-transparent px-0 py-2 d-flex justify-content-between">
                  <span className="text-muted fw-medium">Roles:</span>
                  <div>
                    {user?.roles?.map((role, idx) => (
                      <span key={idx} className="badge bg-secondary ms-1">{role}</span>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Layout Verification */}
        <div className="col-md-6">
          <div className="card shadow-sm border h-100 bg-body">
            <div className="card-header bg-transparent py-3 border-bottom">
              <h5 className="mb-0 fw-semibold text-success">
                <i className="bi bi-check-circle-fill me-2"></i>Layout & Shell Verification
              </h5>
            </div>
            <div className="card-body">
              <p>Confirm core behaviors are working properly:</p>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><i className="bi bi-check-lg text-success me-2"></i>Responsive Sidebar</li>
                <li className="mb-2"><i className="bi bi-check-lg text-success me-2"></i>Theme Mode persistence</li>
                <li className="mb-0"><i className="bi bi-check-lg text-success me-2"></i>Permissions and Dynamic Links</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
