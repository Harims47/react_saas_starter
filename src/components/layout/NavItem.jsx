import React from "react";
import { NavLink } from "react-router-dom";

export const NavItem = ({ item, isSubItem }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `nav-item-custom${isActive ? " active" : ""}${isSubItem ? " nav-sub-item" : ""}`
      }
    >
      <i 
        className={`bi ${item.icon || 'bi-dot'} nav-item-icon`} 
        style={isSubItem ? { fontSize: '0.45rem', marginRight: '0.9rem' } : undefined}
      ></i>
      <span className="nav-item-text">{item.title}</span>
    </NavLink>
  );
};

export default NavItem;
