
import { ExternalLink } from 'lucide-react';
import { GamblingPolicyDialog } from './GamblingPolicyDialog';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { TermsOfServiceDialog } from './TermsOfServiceDialog';
export const Footer = () => {
  return <footer className="bg-secondary/50 mt-8 md:mt-12 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="font-semibold mb-4">দ্রুত লিঙ্কগুলি</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/site-admin" className="text-muted-foreground hover:text-primary">সাইট এডমিন</a></li>
              <li><a href="/sub-admin" className="text-muted-foreground hover:text-primary">সাব অ্যাডমিন</a></li>
              <li><a href="/super-agent" className="text-muted-foreground hover:text-primary">সুপার এজেন্ট</a></li>
              <li><a href="/master-agent" className="text-muted-foreground hover:text-primary">মাস্টার এজেন্ট</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">আমাদের নেটওয়ার্ক</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://velki.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary inline-flex items-center gap-1">
                  মূল ওয়েবসাইট
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary">
                  গেমস পোর্টাল
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">নীতিমালা</h3>
            <ul className="space-y-2 text-sm">
              <li><GamblingPolicyDialog /></li>
              <li><PrivacyPolicyDialog /></li>
              <li><TermsOfServiceDialog /></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">সাধারণ প্রশ্ন উত্তর</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/proxy-links" className="text-muted-foreground hover:text-primary">ভেল্কি প্রক্সি লিংক</a></li>
              <li><a href="/create-account" className="text-muted-foreground hover:text-primary">ভেল্কিতে একাউন্ট খুলবেন?</a></li>
              <li><a href="/new-agent-number" className="text-muted-foreground hover:text-primary">এজেন্ট এর নতুন নম্বর</a></li>
              <li><a href="/search-by-phone" className="text-muted-foreground hover:text-primary">ফোন নম্বর দিয়ে সার্চ করুন</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>© ২০২৫ ভেল্কি। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>;
};
