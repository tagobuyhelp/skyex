
import React from 'react';
import { useColorTheme } from "@/components/ColorThemeProvider";

export const SkyexLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentTheme } = useColorTheme();
  
  return (
    <img 
      src="/lovable-uploads/44b5302e-28ce-45a3-8a70-fcc6f3c4014e.png" 
      alt="Skyex 247 Logo" 
      className={`w-auto h-10 transition-all duration-300 hover:scale-105 ${className}`}
    />
  );
};
