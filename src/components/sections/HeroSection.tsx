
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const bannerImages = [
  "/lovable-uploads/6f26069d-9a40-4b0b-8990-a75efb1e6187.png",
  "/lovable-uploads/ae40f84a-5929-4855-9a6a-46cbc9f823b0.png",
  "/lovable-uploads/2570b596-e25c-4efd-b7fb-a1df273ba0b5.png",
  "/lovable-uploads/62966844-864c-465f-b3fd-9878b1718957.png",
  "/lovable-uploads/5543845b-7990-436b-8c6f-ead647574ad8.png"
];

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(Array(bannerImages.length).fill(false));

  // Banner dimensions - increased mobile height from 200px to 280px
  const bannerHeight = isMobile ? "h-[280px]" : "h-[380px]";

  // Preload images
  useEffect(() => {
    bannerImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setImagesLoaded(prev => {
          const newArray = [...prev];
          newArray[index] = true;
          return newArray;
        });
      };
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToNextSlide = () => {
    setIsAutoPlay(false);
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
  };

  const goToPrevSlide = () => {
    setIsAutoPlay(false);
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1));
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(prev => !prev);
  };

  return (
    <section className="relative overflow-hidden">
      <div className={cn("w-full relative", bannerHeight)}>
        {/* Banner Images */}
        <div className="relative w-full h-full">
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute top-0 left-0 w-full h-full transition-opacity duration-700",
                index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              )}
            >
              <img 
                src={image} 
                alt={`Easy 24 Banner ${index + 1}`} 
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  console.error(`Failed to load image: ${image}`);
                  e.currentTarget.src = "/placeholder.svg"; // Fallback image
                }}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Controls */}
        <div className="absolute z-20 inset-0 flex items-center justify-between px-2 sm:px-4">
          <button 
            onClick={goToPrevSlide}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-colors"
            aria-label="Previous banner"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button 
            onClick={goToNextSlide}
            className="bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-colors"
            aria-label="Next banner"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        
        {/* Autoplay Toggle Button */}
        <div className="absolute z-20 top-2 right-2 sm:top-4 sm:right-4">
          <button 
            onClick={toggleAutoPlay}
            className={cn(
              "bg-black/30 hover:bg-black/50 text-white rounded-full p-1 sm:p-2 transition-colors flex items-center gap-1",
              isAutoPlay && "animate-pulse"
            )}
            aria-label={isAutoPlay ? "Pause autoplay" : "Start autoplay"}
          >
            {isAutoPlay ? (
              <>
                <Pause className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs hidden sm:inline">Auto</span>
              </>
            ) : (
              <>
                <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-xs hidden sm:inline">Auto</span>
              </>
            )}
          </button>
        </div>
        
        {/* Indicators */}
        <div className="absolute z-20 bottom-2 left-0 right-0 flex justify-center gap-1 sm:gap-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setIsAutoPlay(false);
                setCurrentImageIndex(index);
              }}
              className={cn(
                "w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors",
                index === currentImageIndex 
                  ? "bg-primary" 
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to banner ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
