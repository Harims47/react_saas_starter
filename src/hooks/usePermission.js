import { useSelector } from "react-redux";
import { ROLES } from "../constants/roles";

export const usePermission = () => {
  const { roles, permissions } = useSelector((state) => state.auth);

  const isSuperAdmin = roles.includes(ROLES.SUPER_ADMIN);

  const hasPermission = (permission) => {
    if (isSuperAdmin) return true;
    if (!permission) return true;
    return permissions.includes(permission);
  };

  const hasRole = (role) => {
    if (isSuperAdmin) return true;
    if (!role) return true;
    return roles.includes(role);
  };

  const hasAnyRole = (allowedRoles = []) => {
    if (isSuperAdmin) return true;
    if (allowedRoles.length === 0) return true;
    return allowedRoles.some((r) => roles.includes(r));
  };

  return {
    hasPermission,
    hasRole,
    hasAnyRole,
    roles,
    permissions,
    isSuperAdmin,
  };
};

export default usePermission;
