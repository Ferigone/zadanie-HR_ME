import React, { createContext, useContext, useState } from "react";

export const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});
export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode") || "false"));
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  const themeClasses = darkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-black";

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className={themeClasses}>{children}</div>
    </ThemeContext.Provider>
  );
};

// Hook dostępu do kontekstu tematu
export const useTheme = () => {
  return useContext(ThemeContext);
};
