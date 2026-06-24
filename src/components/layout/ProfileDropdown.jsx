import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";

export const ProfileDropdown = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (!user) return null;

  return (
    <div className="dropdown">
      <button
        className="btn d-flex align-items-center border-0 p-0 dropdown-toggle"
        type="button"
        id="profileDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <div
          className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold me-2"
          style={{ width: "35px", height: "35px", fontSize: "0.85rem" }}
        >
          {getInitials(user.name)}
        </div>
        <span className="d-none d-md-inline-block align-middle fw-medium me-1">
          {user.name}
        </span>
      </button>
      <ul
        className="dropdown-menu dropdown-menu-end profile-dropdown-menu shadow border mt-2"
        aria-labelledby="profileDropdown"
      >
        <li className="px-3 py-2 border-bottom">
          <div className="fw-semibold text-truncate" style={{ maxWidth: "200px" }}>{user.name}</div>
          <div className="small text-muted text-truncate" style={{ maxWidth: "200px" }}>{user.email}</div>
        </li>
        <li>
          <a className="dropdown-item py-2" href="#profile">
            <i className="bi bi-person me-2"></i>My Profile
          </a>
        </li>
        <li>
          <a className="dropdown-item py-2" href="#settings">
            <i className="bi bi-gear me-2"></i>Settings
          </a>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i>Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
