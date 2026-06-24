import React, { createContext, useState, useEffect } from "react";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    // Default to 'light' if not set
    return savedTheme === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    // Update local storage
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    // Apply Bootstrap 5 native color mode
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
