
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Home, Shield, Users, Star, Crown } from 'lucide-react';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-xl font-semibold">LC247</Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === '/' ? 'text-emerald-400' : ''
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              to="/site-admin" 
              className={`text-sm hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === '/site-admin' ? 'text-emerald-400' : ''
              }`}
            >
              <Shield className="w-4 h-4" />
              Site Admin
            </Link>
            <Link 
              to="/sub-admin" 
              className={`text-sm hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === '/sub-admin' ? 'text-emerald-400' : ''
              }`}
            >
              <Users className="w-4 h-4" />
              Sub Admin
            </Link>
            <Link 
              to="/super-agent" 
              className={`text-sm hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === '/super-agent' ? 'text-emerald-400' : ''
              }`}
            >
              <Star className="w-4 h-4" />
              Super Agent
            </Link>
            <Link 
              to="/master-agent" 
              className={`text-sm hover:text-emerald-400 flex items-center gap-2 ${
                location.pathname === '/master-agent' ? 'text-emerald-400' : ''
              }`}
            >
              <Crown className="w-4 h-4" />
              Master Agent
            </Link>
          </nav>

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
        </div>

        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full p-4 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 animate-fade-in">
            <input
              type="search"
              placeholder="Search agents..."
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        )}
      </div>
    </header>
  );
};
