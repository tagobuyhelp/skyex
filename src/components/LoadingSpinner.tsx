
import React from 'react';
import { SkyexLogo } from '@/components/SkyexLogo';
import { useColorTheme } from '@/components/ColorThemeProvider';
import { Loader } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  showLogo?: boolean;
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  showLogo = true,
  text
}) => {
  const { currentTheme } = useColorTheme();
  
  const sizeClasses = {
    sm: 'h-16 w-16',
    md: 'h-24 w-24',
    lg: 'h-32 w-32'
  };
  
  const logoSizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`relative ${sizeClasses[size]}`}>
        {showLogo && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <SkyexLogo className={logoSizes[size]} />
          </div>
        )}
        <div className="absolute inset-0 animate-spin">
          <div 
            className="h-full w-full rounded-full border-t-2 border-b-2" 
            style={{ borderColor: currentTheme.primary }}
          />
        </div>
      </div>
      {text && (
        <p className="text-muted-foreground animate-pulse text-center">{text}</p>
      )}
    </div>
  );
};
