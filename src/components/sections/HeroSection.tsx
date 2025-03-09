import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const bannerImages = [
  "/lovable-uploads/2554e518-9477-4436-a436-591dcf318a0c.png",
  "/lovable-uploads/99eae644-a90e-4256-adbf-f6e0370aff36.png",
  "/lovable-uploads/cbbf68af-9489-41de-9951-fe4d846800af.png",
  "/lovable-uploads/985f7cc9-e214-4063-9ee2-c848c4565308.png"
];

export const HeroSection = () => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(Array(bannerImages.length).fill(false));

  // Banner dimensions
  const bannerHeight = isMobile ? "h-[200px]" : "h-[380px]";

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
                alt={`Skyex 247 Banner ${index + 1}`} 
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

      {/* Dedicated Slide Changing Buttons */}
      <div className="flex justify-center mt-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToPrevSlide}
          className="flex items-center gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToNextSlide}
          className="flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
