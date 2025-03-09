
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
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
    <div className="notice-marquee-container w-full overflow-hidden">
      <div className="notice-marquee-content">
        {notices.map(notice => {
          const Icon = getIcon(notice.type);
          return (
            <div
              key={notice.id}
              className={cn(
                "inline-flex items-start gap-2 px-3 py-2 mx-4 rounded-lg transition-colors",
                getTypeStyles(notice.type)
              )}
            >
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 mt-0.5" />
              <div className="min-w-0 flex overflow-hidden">
                <p className="text-sm sm:text-base font-medium whitespace-nowrap">
                  {notice.title}
                </p>
                {notice.content && (
                  <p className="text-xs sm:text-sm ml-2 text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
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
