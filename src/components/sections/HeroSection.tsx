
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const bannerImages = [
  "/lovable-uploads/985f7cc9-e214-4063-9ee2-c848c4565308.png",
  "/lovable-uploads/530834c4-3849-4858-8316-0359fe6e8f8b.png",
  "/lovable-uploads/9135a693-ca05-430f-9bcf-a79bd028f215.png",
  "/lovable-uploads/26f69b49-5b74-4844-bbc5-113b1a66b8b2.png"
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
    </section>
  );
};
