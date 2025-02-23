
import { ExternalLink, Heart, MessageSquare, Star, Globe } from 'lucide-react';
import { GamblingPolicyDialog } from './GamblingPolicyDialog';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { TermsOfServiceDialog } from './TermsOfServiceDialog';

export const Footer = () => {
  return (
    <footer className="relative mt-8 md:mt-12">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0A1321] pointer-events-none" />
      
      {/* Main content */}
      <div className="relative bg-[#0F1A2A]/80 backdrop-blur-md pt-12 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          {/* Grid layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                <Star className="w-4 h-4" />
                দ্রুত লিঙ্কগুলি
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/site-admin" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    সাইট এডমিন
                  </a>
                </li>
                <li>
                  <a href="/sub-admin" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    সাব অ্যাডমিন
                  </a>
                </li>
                <li>
                  <a href="/super-agent" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    সুপার এজেন্ট
                  </a>
                </li>
                <li>
                  <a href="/master-agent" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    মাস্টার এজেন্ট
                  </a>
                </li>
              </ul>
            </div>

            {/* Our Network */}
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                <Globe className="w-4 h-4" />
                আমাদের নেটওয়ার্ক
              </h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://skyex.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    মূল ওয়েবসাইট
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2"
                  >
                    গেমস পোর্টাল
                  </a>
                </li>
              </ul>
            </div>

            {/* Policies */}
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                নীতিমালা
              </h3>
              <ul className="space-y-2">
                <li><GamblingPolicyDialog /></li>
                <li><PrivacyPolicyDialog /></li>
                <li><TermsOfServiceDialog /></li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="space-y-4">
              <h3 className="font-semibold text-emerald-400 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                সাধারণ প্রশ্ন উত্তর
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="/proxy-links" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    স্কাইএক্স প্রক্সি লিংক
                  </a>
                </li>
                <li>
                  <a href="/create-account" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    স্কাইএক্স একাউন্ট খুলবেন?
                  </a>
                </li>
                <li>
                  <a href="/new-agent-number" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    এজেন্ট এর নতুন নম্বর
                  </a>
                </li>
                <li>
                  <a href="/search-by-phone" className="text-gray-300 hover:text-emerald-400 transition-colors text-sm flex items-center gap-2">
                    ফোন নম্বর দিয়ে সার্চ করুন
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-gray-800/50">
            <p className="text-center text-sm text-gray-400">
              © ২০২৫ স্কাইএক্স। সর্বস্বত্ব সংরক্ষিত।
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
