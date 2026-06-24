import axios from "axios";
import { appConfig } from "../config/appConfig";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { store } from "../store";
import { logout } from "../store/slices/authSlice";

const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Bearer Token if available
api.interceptors.request.use(
  (config) => {
    // Attempt to get token from Redux store first, fall back to localStorage
    const token = store.getState().auth.token || localStorage.getItem(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle errors, particularly 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth store state and storage keys on unauthorized access
      store.dispatch(logout());
      console.warn("Session expired. User logged out.");
    }
    return Promise.reject(error);
  }
);

export default api;
