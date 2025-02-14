
import { useState } from 'react';
import { Menu, Search, User } from 'lucide-react';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="glass-card p-4 sticky top-0 z-50 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">LC247</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSearchOpen(!isSearchOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          <Search className="w-6 h-6" />
        </button>
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <User className="w-6 h-6" />
        </button>
      </div>

      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full p-4 glass-card mt-2 animate-fade-in">
          <input
            type="search"
            placeholder="Search agents..."
            className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
          />
        </div>
      )}
    </header>
  );
};
