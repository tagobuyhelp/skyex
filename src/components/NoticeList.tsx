
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
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

export const NoticeList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const user = supabase.auth.getUser();

  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

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

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "বিজ্ঞপ্তি মুছে ফেলতে ব্যর্থ হয়েছে",
        description: error.message,
      });
      return;
    }

    toast({
      title: "বিজ্ঞপ্তি মুছে ফেলা হয়েছে",
      description: "বিজ্ঞপ্তিটি সফলভাবে মুছে ফেলা হয়েছে।",
    });

    queryClient.invalidateQueries({ queryKey: ["notices"] });
  };

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
      plugins={[plugin.current]}
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
                {user && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(notice.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
};
