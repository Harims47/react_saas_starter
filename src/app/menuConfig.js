import { PERMISSIONS } from "../constants/permissions";
import { ROLES } from "../constants/roles";
import { ROUTES } from "../constants/routes";

export const menuConfig = [
  {
    title: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: "bi-grid-1x2-fill",
    permission: PERMISSIONS.DASHBOARD_VIEW,
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN, ROLES.USER],
  },
  {
    section: "Academic Registry",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    items: [
      {
        title: "Masters & Catalog",
        icon: "bi-collection-fill",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
        children: [

          { title: "Settings Console", path: "/settings", icon: "bi-circle-fill" },
        ],
      },
    ],
  },
  {
    section: "Admin Console",
    roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
    items: [
      {
        title: "System Configuration",
        path: "/settings",
        icon: "bi-gear-fill",
        roles: [ROLES.SUPER_ADMIN, ROLES.ADMIN],
      },
    ],
  },
];

export default menuConfig;
