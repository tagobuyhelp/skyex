
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
      
      {/* Animated Sky Element */}
      <g className="sky-element">
        <path 
          d="M20,40 C20,20 40,20 60,40 C80,60 100,60 120,40 C140,20 160,20 180,40 C200,60 220,60 240,40" 
          fill="none" 
          stroke="url(#skyGradient)" 
          strokeWidth="4"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-pulse"
        />
        <circle 
          cx="190" 
          cy="30" 
          r="10" 
          fill="#FFB200" 
          className="animate-[ping_3s_ease-in-out_infinite]"
        />
      </g>
      
      {/* Text */}
      <text 
        x="50%" 
        y="70" 
        textAnchor="middle" 
        className="text-2xl font-bold" 
        fill="#FFB200"
        style={{ 
          fontSize: '28px', 
          fontWeight: 'bold',
          filter: 'url(#glow)' 
        }}
      >
        SKYEX
      </text>
    </svg>
  );
};
