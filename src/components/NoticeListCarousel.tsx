
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import { formatDistanceToNow } from "date-fns";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  created_at: string;
}

export const NoticeListCarousel = () => {
  const { data: notices = [] } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);
      if (error) throw error;
      return data as Notice[];
    }
  });

  const getIcon = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return "bg-blue-500 shadow-blue-500/50";
      case "warning":
        return "bg-yellow-500 shadow-yellow-500/50";
      case "success":
        return "bg-green-500 shadow-green-500/50";
      case "error":
        return "bg-red-500 shadow-red-500/50";
    }
  };

  return (
    <Carousel 
      opts={{
        align: "center",
        loop: true,
        dragFree: true,
        watchDrag: false,
      }}
      plugins={[
        Autoplay({ 
          delay: 3000, 
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          rootNode: (emblaRoot) => emblaRoot.parentElement,
        })
      ]} 
      className="w-full"
    >
      <CarouselContent>
        {notices.map(notice => (
          <CarouselItem key={notice.id}>
            <div className="flex items-center justify-between w-full group">
              <div className="flex items-center flex-1 marquee-container">
                <div className="notice-title">
                  <span className={cn(
                    "priority-indicator inline-block w-1.5 h-1.5 flex-shrink-0 rounded-full shadow-lg",
                    getIcon(notice.type)
                  )} />
                  <span className="text-xs font-medium text-white ml-2 opacity-90 group-hover:opacity-100">
                    {notice.title}:
                  </span>
                </div>
                <div className="notice-content-wrapper overflow-hidden">
                  <div className="marquee-content animate-marquee whitespace-nowrap">
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      {notice.content}
                    </span>
                    <span className="ml-16" />
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      {notice.content}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex items-center text-gray-400 text-[10px] whitespace-nowrap ml-3 opacity-75 group-hover:opacity-100 transition-opacity">
                <Clock className="w-3 h-3 mr-1 flex-shrink-0" />
                <span>
                  {formatDistanceToNow(new Date(notice.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

