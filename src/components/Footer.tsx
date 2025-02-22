
import { ExternalLink } from 'lucide-react';
import { GamblingPolicyDialog } from './GamblingPolicyDialog';

export const Footer = () => {
  return (
    <footer className="bg-secondary/50 mt-8 md:mt-12 py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/site-admin" className="text-muted-foreground hover:text-primary">Admin List</a></li>
              <li><a href="/sub-admin" className="text-muted-foreground hover:text-primary">Sub Admin</a></li>
              <li><a href="/super-agent" className="text-muted-foreground hover:text-primary">Super Agent</a></li>
              <li><a href="/master-agent" className="text-muted-foreground hover:text-primary">Master Agent</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Our Networks</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://velki.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                >
                  Main Website
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary"
                >
                  Games Portal
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><GamblingPolicyDialog /></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary">Help Center</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-primary/20 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Velki. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
