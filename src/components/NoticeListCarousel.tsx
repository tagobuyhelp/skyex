import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
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
        return "text-blue-400 bg-blue-400/10";
      case "warning":
        return "text-yellow-400 bg-yellow-400/10";
      case "success":
        return "text-green-400 bg-green-400/10";
      case "error":
        return "text-red-400 bg-red-400/10";
    }
  };
  return <Carousel opts={{
    align: "start",
    loop: true
  }} plugins={[Autoplay({
    delay: 3000,
    stopOnInteraction: false
  })]} className="w-full">
      <CarouselContent>
        {notices.map(notice => {
        const Icon = getIcon(notice.type);
        return <CarouselItem key={notice.id} className="basis-full sm:basis-3/4 md:basis-2/3 lg:basis-1/2">
              <div className="">
                <Icon className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium line-clamp-2">{notice.title}</p>
                  {notice.content && <p className="text-sm mt-1 text-muted-foreground line-clamp-1">
                      {notice.content}
                    </p>}
                </div>
              </div>
            </CarouselItem>;
      })}
      </CarouselContent>
    </Carousel>;
};