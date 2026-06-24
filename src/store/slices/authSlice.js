import { createSlice } from "@reduxjs/toolkit";
import { STORAGE_KEYS } from "../../constants/storageKeys";

const getInitialUser = () => {
  try {
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (e) {
    console.error("Failed to parse stored user", e);
    return null;
  }
};

const initialUser = getInitialUser();

const initialState = {
  user: initialUser,
  token: localStorage.getItem(STORAGE_KEYS.TOKEN) || null,
  roles: initialUser?.roles || [],
  permissions: initialUser?.permissions || [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;
      state.loading = false;
      state.user = user;
      state.token = token;
      state.roles = user?.roles || [];
      state.permissions = user?.permissions || [];
      state.error = null;

      // Persist to local storage
      localStorage.setItem(STORAGE_KEYS.TOKEN, token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.roles = [];
      state.permissions = [];
      state.loading = false;
      state.error = null;

      // Clear local storage
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
