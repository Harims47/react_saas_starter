import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `nav-item-custom${isActive ? " active" : ""}`
      }
    >
      <i className={`bi ${item.icon}`}></i>
      <span className="nav-item-text">{item.title}</span>
    </NavLink>
  );
};

export default NavItem;
