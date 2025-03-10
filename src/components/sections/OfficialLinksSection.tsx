
import { Globe, ExternalLink } from "lucide-react";
import { useColorTheme } from "@/components/ColorThemeProvider";

export const OfficialLinksSection = () => {
  const { currentTheme } = useColorTheme();
  
  return (
    <section className="container py-6 md:py-12 px-4">
      <div className="glass-card p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          <span className="text-primary">Official Links</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <a href="http://skyex247.pro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg hover:bg-primary/20 transition-colors">
            <span className="text-sm md:text-base">Main Website</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </a>
          <a href="http://skyex247.pro" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg hover:bg-primary/20 transition-colors">
            <span className="text-sm md:text-base">Live Portal</span>
            <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};
