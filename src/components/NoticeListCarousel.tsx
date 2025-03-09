
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useEffect } from "react";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  created_at: string;
}

export const NoticeListCarousel = () => {
  const {
    data: notices = []
  } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("notices").select("*").order("created_at", {
        ascending: false
      }).limit(5);
      if (error) throw error;
      return data as Notice[];
    }
  });
  
  const isMobile = useIsMobile();
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current || notices.length === 0) return;
  }, [notices.length]);
  
  const getIcon = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return Info;
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
    }
  };
  
  const getTypeStyles = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return "text-primary bg-primary/10";
      case "warning":
        return "text-primary bg-primary/10";
      case "success":
        return "text-primary bg-primary/10";
      case "error":
        return "text-red-400 bg-red-400/10";
    }
  };
  
  // If no notices, return empty div
  if (notices.length === 0) {
    return <div className="min-h-[30px]"></div>;
  }
  
  return (
    <div className="relative overflow-hidden w-full">
      <div 
        ref={marqueeRef}
        className="marquee flex animate-marquee space-x-6 whitespace-nowrap"
      >
        {notices.map(notice => {
          const Icon = getIcon(notice.type);
          return (
            <div 
              key={notice.id} 
              className={cn(
                "flex items-start gap-2 px-3 py-2 rounded-lg transition-colors min-w-max",
                getTypeStyles(notice.type)
              )}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <div className="min-w-0 flex">
                <p className="text-sm sm:text-base font-medium whitespace-nowrap">
                  {notice.title}
                </p>
                {notice.content && (
                  <p className="text-xs sm:text-sm ml-2 text-muted-foreground whitespace-nowrap">
                    - {notice.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
        
        {/* Duplicate notices for seamless loop */}
        {notices.map(notice => {
          const Icon = getIcon(notice.type);
          return (
            <div 
              key={`duplicate-${notice.id}`} 
              className={cn(
                "flex items-start gap-2 px-3 py-2 rounded-lg transition-colors min-w-max",
                getTypeStyles(notice.type)
              )}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <div className="min-w-0 flex">
                <p className="text-sm sm:text-base font-medium whitespace-nowrap">
                  {notice.title}
                </p>
                {notice.content && (
                  <p className="text-xs sm:text-sm ml-2 text-muted-foreground whitespace-nowrap">
                    - {notice.content}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
