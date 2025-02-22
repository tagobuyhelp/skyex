
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, User, Home, Shield, Users, Star, Crown, ExternalLink, UserPlus, Phone, List } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
              হোম
            </Link>
            <Link 
              to="/site-admin" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/site-admin' ? 'text-primary' : ''
              }`}
            >
              <Shield className="w-4 h-4" />
              সাইট এডমিন
            </Link>
            <Link 
              to="/sub-admin" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/sub-admin' ? 'text-primary' : ''
              }`}
            >
              <Users className="w-4 h-4" />
              সাব এডমিন
            </Link>
            <Link 
              to="/super-agent" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/super-agent' ? 'text-primary' : ''
              }`}
            >
              <Star className="w-4 h-4" />
              সুপার এজেন্ট
            </Link>
            <Link 
              to="/master-agent" 
              className={`text-sm hover:text-primary flex items-center gap-2 ${
                location.pathname === '/master-agent' ? 'text-primary' : ''
              }`}
            >
              <Crown className="w-4 h-4" />
              মাস্টার এজেন্ট
            </Link>

            {/* FAQ Dropdown Menu with Hover */}
            <div className="relative group">
              <button className="text-sm hover:text-primary flex items-center gap-2 cursor-pointer">
                <List className="w-4 h-4" />
                সাধারণ প্রশ্ন উত্তর
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 bg-[#1F2937]/95 backdrop-blur-sm border border-primary/20 rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <Link 
                  to="/proxy-links" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>ভেল্কি প্রক্সি লিংক</span>
                </Link>
                <Link 
                  to="/create-account" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>ভেল্কিতে একাউন্ট খুলবেন?</span>
                </Link>
                <Link 
                  to="/new-agent-number" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>এজেন্ট এর নতুন নম্বর</span>
                </Link>
                <Link 
                  to="/search-by-phone" 
                  className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>ফোন নম্বর দিয়ে সার্চ করুন</span>
                </Link>
              </div>
            </div>
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
              placeholder="এজেন্টদের খুঁজুন..."
              className="w-full p-2 rounded-lg bg-white/10 border border-primary/20 text-white placeholder:text-white/60"
            />
          </div>
        )}
      </div>
    </header>
  );
};
