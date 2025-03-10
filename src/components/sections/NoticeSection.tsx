
import { Info } from "lucide-react";
import { NoticeListCarousel } from '@/components/NoticeListCarousel';
import { useColorTheme } from "@/components/ColorThemeProvider";

export const NoticeSection = () => {
  const { currentTheme } = useColorTheme();
  
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="container py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 shrink-0">
            <Info className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-medium text-base sm:text-lg whitespace-nowrap">নোটিশ:</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <NoticeListCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};
