
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerSupport } from '@/components/CustomerSupport';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ExternalLink } from 'lucide-react';

const Index = () => {
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const heroImages = [
    "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1636955860106-9eb89e576026?q=80&w=2073&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611425143678-08fc480cafde?q=80&w=2073&auto=format&fit=crop",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[280px] md:h-[320px] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full h-full"
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-[280px] md:h-[320px] relative">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90">
                    <div className="container h-full flex items-center justify-center px-4">
                      <div className="text-center space-y-3">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                          Skyex OFFICIAL WEBSITE
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
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

      {/* Proxy Links Section */}
      <section className="container py-6 md:py-12 px-4">
        <div className="glass-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            স্কাইএক্স প্রক্সি লিংক
          </h2>
          <div className="space-y-3 md:space-y-4">
            <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
              <p className="text-base md:text-lg mb-2">স্কাইএক্স সাইটের প্রক্সী লিংকঃ</p>
              <div className="space-y-2">
                <a 
                  href="http://skyex247.live" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base"
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  http://skyex247.live
                </a>
                <a 
                  href="http://skyexspin24.live" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base"
                >
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  http://skyexspin24.live
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default Index;
