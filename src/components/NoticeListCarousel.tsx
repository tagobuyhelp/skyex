
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

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
    },
  });

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
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
    }
  };

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
      className="w-full"
    >
      <CarouselContent>
        {notices.map((notice) => {
          const Icon = getIcon(notice.type);
          return (
            <CarouselItem key={notice.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-background/50 group">
                <Icon className={cn("w-4 h-4", getTypeStyles(notice.type))} />
                <p className="text-sm font-medium flex-1 whitespace-nowrap">{notice.title}</p>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
