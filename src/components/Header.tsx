
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Home, Shield, Users, Star, Crown } from 'lucide-react';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <Link to="/" className="text-xl font-semibold text-gradient">Velki</Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/' ? 'text-primary' : ''
              }`}
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link 
              to="/site-admin" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/site-admin' ? 'text-primary' : ''
              }`}
            >
              <Shield className="w-4 h-4" />
              Site Admin
            </Link>
            <Link 
              to="/sub-admin" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/sub-admin' ? 'text-primary' : ''
              }`}
            >
              <Users className="w-4 h-4" />
              Sub Admin
            </Link>
            <Link 
              to="/super-agent" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/super-agent' ? 'text-primary' : ''
              }`}
            >
              <Star className="w-4 h-4" />
              Super Agent
            </Link>
            <Link 
              to="/master-agent" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/master-agent' ? 'text-primary' : ''
              }`}
            >
              <Crown className="w-4 h-4" />
              Master Agent
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
            >
              <Search className="w-6 h-6" />
            </button>
            <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full p-4 bg-background/95 backdrop-blur-sm border-b border-primary/20 animate-fade-in">
            <input
              type="search"
              placeholder="Search agents..."
              className="w-full p-2 rounded-lg bg-white/10 border border-primary/20 text-white placeholder:text-white/60"
            />
          </div>
        )}
      </div>
    </header>
  );
};
