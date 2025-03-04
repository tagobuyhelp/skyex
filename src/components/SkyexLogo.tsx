
import React from 'react';

export const SkyexLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg 
      viewBox="0 0 240 80" 
      className={`w-auto h-8 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="skyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#33C3F0" />
          <stop offset="100%" stopColor="#1EAEDB" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Sun Element */}
      <circle 
        cx="120" 
        cy="30" 
        r="15" 
        fill="#FFB200" 
        className="animate-[ping_3s_ease-in-out_infinite]"
      />
      
      {/* Animated Text */}
      <text 
        x="50%" 
        y="65" 
        textAnchor="middle" 
        className="animate-[pulse_2s_ease-in-out_infinite]"
        fill="#FFB200"
        style={{ 
          fontSize: '32px', 
          fontWeight: 'bold',
          filter: 'url(#glow)' 
        }}
      >
        SKYEX
      </text>
    </svg>
  );
};
