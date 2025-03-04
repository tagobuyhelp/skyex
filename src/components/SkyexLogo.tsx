
import React from 'react';
import { useColorTheme } from "@/components/ColorThemeProvider";

export const SkyexLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { currentTheme } = useColorTheme();
  
  return (
    <svg 
      viewBox="0 0 240 80" 
      className={`w-auto h-8 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={currentTheme.primary} />
          <stop offset="100%" stopColor={currentTheme.primary} />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        {/* Color changing animation for text */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={currentTheme.primary}>
            <animate 
              attributeName="stop-color" 
              values={`${currentTheme.primary}; #33C3F0; #D946EF; #F97316; ${currentTheme.primary}`}
              dur="10s" 
              repeatCount="indefinite" 
            />
          </stop>
          <stop offset="100%" stopColor={currentTheme.primary}>
            <animate 
              attributeName="stop-color" 
              values={`${currentTheme.primary}; #1EAEDB; #8B5CF6; #EA384C; ${currentTheme.primary}`}
              dur="10s" 
              repeatCount="indefinite" 
            />
          </stop>
        </linearGradient>
      </defs>
      
      {/* Sun Element */}
      <circle 
        cx="120" 
        cy="30" 
        r="15" 
        fill={currentTheme.primary}
        className="animate-[ping_3s_ease-in-out_infinite]"
      />
      
      {/* Animated Text */}
      <text 
        x="50%" 
        y="65" 
        textAnchor="middle" 
        className="animate-[pulse_2s_ease-in-out_infinite]"
        fill="url(#textGradient)"
        style={{ 
          fontSize: '64px', 
          fontWeight: 'bold',
          filter: 'url(#glow)' 
        }}
      >
        SKYEX
      </text>
    </svg>
  );
};

