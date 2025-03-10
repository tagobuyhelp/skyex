
import React, { createContext, useContext, useState, useEffect } from "react";

type ColorTheme = {
  primary: string;
  name: string;
};

const defaultThemes: ColorTheme[] = [
  { name: "Sky Blue", primary: "#33C3F0" },
  { name: "Gold", primary: "#FFB200" },
  { name: "Green", primary: "#89AC46" },
  { name: "Purple", primary: "#8B5CF6" },
  { name: "Magenta", primary: "#D946EF" },
  { name: "Orange", primary: "#F97316" },
];

type ColorThemeContextType = {
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  themes: ColorTheme[];
  addCustomTheme: (theme: ColorTheme) => void;
};

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themes, setThemes] = useState<ColorTheme[]>(defaultThemes);
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(defaultThemes[0]);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("skyex-theme");
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        setCurrentTheme(parsedTheme);
      } catch (e) {
        console.error("Failed to parse saved theme:", e);
      }
    }
  }, []);

  // Update CSS variables when theme changes
  useEffect(() => {
    document.documentElement.style.setProperty("--primary-color", currentTheme.primary);
    
    // Calculate and set derived colors
    const primaryHex = currentTheme.primary.substring(1);
    const r = parseInt(primaryHex.substring(0, 2), 16);
    const g = parseInt(primaryHex.substring(2, 4), 16);
    const b = parseInt(primaryHex.substring(4, 6), 16);
    
    // Set primary with 10% transparency for borders
    document.documentElement.style.setProperty(
      "--primary-transparent", 
      `rgba(${r}, ${g}, ${b}, 0.2)`
    );
    
    // Set a slightly darker shade for accent/hover
    const darkenAmount = 10;
    const darkerR = Math.max(0, r - darkenAmount);
    const darkerG = Math.max(0, g - darkenAmount);
    const darkerB = Math.max(0, b - darkenAmount);
    
    document.documentElement.style.setProperty(
      "--accent-color",
      `rgb(${darkerR}, ${darkerG}, ${darkerB})`
    );
    
    // Save to localStorage
    localStorage.setItem("skyex-theme", JSON.stringify(currentTheme));
  }, [currentTheme]);

  const setTheme = (theme: ColorTheme) => {
    setCurrentTheme(theme);
  };

  const addCustomTheme = (theme: ColorTheme) => {
    if (!themes.some(t => t.name === theme.name)) {
      setThemes(prev => [...prev, theme]);
    }
    setCurrentTheme(theme);
  };

  return (
    <ColorThemeContext.Provider value={{ currentTheme, setTheme, themes, addCustomTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = () => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error("useColorTheme must be used within a ColorThemeProvider");
  }
  return context;
};
