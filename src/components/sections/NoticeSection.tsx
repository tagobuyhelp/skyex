
import { Info } from "lucide-react";
import { NoticeListCarousel } from '@/components/NoticeListCarousel';

export const NoticeSection = () => {
  return (
    <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
      <div className="container py-3 px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 shrink-0 overflow-hidden">
            <Info className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-primary font-medium text-base sm:text-lg whitespace-nowrap">নোটিশ:</span>
          </div>
          <div className="flex-1 text-base sm:text-lg">
            <NoticeListCarousel />
          </div>
        </div>
      </div>
    </div>
  );
};
