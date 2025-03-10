
import React from 'react';
import { useColorTheme } from "@/components/ColorThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

export const SkyexLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentTheme } = useColorTheme();
  const isMobile = useIsMobile();
  
  // Set default height for mobile and desktop
  const logoHeight = isMobile ? "h-14" : "h-10";
  
  return (
    <img 
      src="/lovable-uploads/4c2b36c4-97a1-4b65-9a9e-431490de953e.png" 
      alt="Easy24 Logo" 
      className={`w-auto ${logoHeight} transition-all duration-300 hover:scale-105 ${className}`}
    />
  );
};
