
import * as React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const heroImages = ["/placeholder.svg", "/og-image.png", "/favicon.ico"];

export const HeroSection = () => {
  const plugin = React.useRef(Autoplay({
    delay: 4000,
    stopOnInteraction: false
  }));

  return (
    <section className="relative h-[280px] md:h-[320px] overflow-hidden">
      <Carousel opts={{
        align: "start",
        loop: true
      }} plugins={[plugin.current]} className="w-full h-full">
        <CarouselContent>
          {heroImages.map((image, index) => (
            <CarouselItem key={index} className="w-full h-[280px] md:h-[320px] relative">
              <div className="w-full h-full bg-cover bg-center" style={{
                backgroundImage: `url(${image})`
              }}>
                <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90">
                  <div className="container h-full flex items-center justify-center px-4">
                    <div className="text-center space-y-3">
                      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                        Skyex OFFICIAL WEBSITE
                      </h1>
                      <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Your trusted platform for gaming and entertainment
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 md:left-4 h-8 w-8 md:h-10 md:w-10" />
        <CarouselNext className="right-2 md:right-4 h-8 w-8 md:h-10 md:w-10" />
      </Carousel>
    </section>
  );
};
