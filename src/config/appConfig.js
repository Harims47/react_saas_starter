export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || "SaaS Starter",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  env: import.meta.env.VITE_APP_ENV || "development",
  
  // Reusable SaaS Branding & Marketing Configs
  appTagline: "The Unified Operating System for Modern Enterprises",
  appDescription: "Deploy and manage your School ERP, Clinic system, CRM, HRMS, and inventory tools from a single centralized administration workspace.",
  marketingHeading: "Scale Your Enterprise Operations",
  marketingSubheading: "Integrate student management, clinical scheduling, workflows, and global directories into a single modular SaaS hub.",
};

export default appConfig;
