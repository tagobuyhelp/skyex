
import React from 'react';
import { useColorTheme } from "@/components/ColorThemeProvider";

export const SkyexLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentTheme } = useColorTheme();
  
  return (
    <img 
      src="/lovable-uploads/052d9986-ee41-4652-bcb1-cb9c26922072.png" 
      alt="Skyex 247 Logo" 
      className={`w-auto h-10 transition-all duration-300 hover:scale-105 ${className}`}
    />
  );
};
