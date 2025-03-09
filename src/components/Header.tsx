
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Search, Home, Shield, Users, Star, Crown, ExternalLink, UserPlus, Phone, List, X } from 'lucide-react';
import { AgentSearchModal } from './AgentSearchModal';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SkyexLogo } from './SkyexLogo';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  
  return <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-primary/20">
      <div className="container px-2 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger className="p-1.5 md:p-2 rounded-lg transition-colors md:hidden text-zinc-950 bg-lime-600 hover:bg-lime-500">
                <Menu className="w-5 h-5 md:w-6 md:h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-background/95 backdrop-blur-sm border-r border-primary/20">
                <SheetHeader>
                  <SheetTitle className="text-xl font-semibold text-primary flex items-center gap-2">
                    <SkyexLogo />
                  </SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-4">
                  <Link to="/" className={`text-sm hover:text-primary flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === '/' ? 'text-primary bg-primary/10' : ''}`}>
                    <Home className="w-4 h-4" />
                    হোম
                  </Link>
                  <Link to="/site-admin" className={`text-sm hover:text-primary flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === '/site-admin' ? 'text-primary bg-primary/10' : ''}`}>
                    <Shield className="w-4 h-4" />
                    সাইট এডমিন
                  </Link>
                  <Link to="/sub-admin" className={`text-sm hover:text-primary flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === '/sub-admin' ? 'text-primary bg-primary/10' : ''}`}>
                    <Users className="w-4 h-4" />
                    সাব এডমিন
                  </Link>
                  <Link to="/super-agent" className={`text-sm hover:text-primary flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === '/super-agent' ? 'text-primary bg-primary/10' : ''}`}>
                    <Star className="w-4 h-4" />
                    সুপার এজেন্ট
                  </Link>
                  <Link to="/master-agent" className={`text-sm hover:text-primary flex items-center gap-2 p-2 rounded-lg transition-colors ${location.pathname === '/master-agent' ? 'text-primary bg-primary/10' : ''}`}>
                    <Crown className="w-4 h-4" />
                    মাস্টার এজেন্ট
                  </Link>

                  {/* FAQ Section in Mobile Menu */}
                  <div className="mt-4 border-t border-primary/10 pt-4">
                    <div className="text-sm text-muted-foreground mb-2 px-2">সাধারণ প্রশ্ন উত্তর</div>
                    <Link to="/proxy-links" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors text-sm">
                      <ExternalLink className="w-4 h-4" />
                      স্কাইএক্স প্রক্সি লিংক
                    </Link>
                    <Link to="/create-account" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors text-sm">
                      <UserPlus className="w-4 h-4" />
                      স্কাইএক্স একাউন্ট খুলবেন?
                    </Link>
                    <Link to="/new-agent-number" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors text-sm">
                      <Phone className="w-4 h-4" />
                      এজেন্ট এর নতুন নম্বর
                    </Link>
                    <Link to="/search-by-phone" className="flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors text-sm">
                      <Search className="w-4 h-4" />
                      ফোন নম্বর দিয়ে সার্চ করুন
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="flex items-center">
              <SkyexLogo className="w-auto h-10 md:h-12" />
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm\n">
            <Link to="/" className={`text-sm hover:text-primary flex items-center gap-2 ${location.pathname === '/' ? 'text-primary' : ''}`}>
              <Home className="w-4 h-4" />
              হোম
            </Link>
            <Link to="/site-admin" className={`text-sm hover:text-primary flex items-center gap-2 ${location.pathname === '/site-admin' ? 'text-primary' : ''}`}>
              <Shield className="w-4 h-4" />
              সাইট এডমিন
            </Link>
            <Link to="/sub-admin" className={`text-sm hover:text-primary flex items-center gap-2 ${location.pathname === '/sub-admin' ? 'text-primary' : ''}`}>
              <Users className="w-4 h-4" />
              সাব এডমিন
            </Link>
            <Link to="/super-agent" className={`text-sm hover:text-primary flex items-center gap-2 ${location.pathname === '/super-agent' ? 'text-primary' : ''}`}>
              <Star className="w-4 h-4" />
              সুপার এজেন্ট
            </Link>
            <Link to="/master-agent" className={`text-sm hover:text-primary flex items-center gap-2 ${location.pathname === '/master-agent' ? 'text-primary' : ''}`}>
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
                <Link to="/proxy-links" className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors">
                  <ExternalLink className="w-4 h-4" />
                  <span>স্কাইএক্স প্রক্সি লিংক</span>
                </Link>
                <Link to="/create-account" className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors">
                  <UserPlus className="w-4 h-4" />
                  <span>স্কাইএক্স একাউন্ট খুলবেন?</span>
                </Link>
                <Link to="/new-agent-number" className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4" />
                  <span>এজেন্ট এর নতুন নম্বর</span>
                </Link>
                <Link to="/search-by-phone" className="flex items-center gap-2 px-4 py-2 hover:bg-primary/20 transition-colors">
                  <Search className="w-4 h-4" />
                  <span>ফোন নম্বর দিয়ে সার্চ করুন</span>
                </Link>
              </div>
            </div>
          </nav>

          <div className="flex items-center">
            <AgentSearchModal />
          </div>
        </div>
      </div>
    </header>;
};
