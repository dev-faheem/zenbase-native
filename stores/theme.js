import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import themes from "themes";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes["dark"]);
  const [themeKey, setThemeKey] = useState("dark");

  const setLightTheme = () => {
    setTheme(themes["light"]);
    setThemeKey("light");
  };
  const setDarkTheme = () => {
    setTheme(themes["dark"]);
    setThemeKey("dark");
  };

  const toggleTheme = (switchTheme = null) => {
    if (switchTheme !== null) {
      setTheme(themes[switchTheme]);
    } else {
      if (themeKey === "dark") {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeKey }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
