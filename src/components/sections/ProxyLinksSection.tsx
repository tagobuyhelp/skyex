
import { Link, ExternalLink } from "lucide-react";

export const ProxyLinksSection = () => {
  return (
    <section className="container py-6 md:py-12 px-4">
      <div className="glass-card p-4 md:p-6">
        <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
          <Link className="w-4 h-4 md:w-5 md:h-5" />
          স্কাইএক্স প্রক্সি লিঙ্ক
        </h2>
        <div className="space-y-3 md:space-y-4">
          <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
            <p className="text-base md:text-lg mb-2">স্কাইএক্স সাইটের প্রক্সী লিঙ্কঃ</p>
            <div className="space-y-2">
              <a href="https://www.easy24.site" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                www.easy24.site
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
