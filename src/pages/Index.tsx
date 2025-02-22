
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { AlertTriangle, Eye, ExternalLink, Globe, MessageSquare, Phone, Shield, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AgentHierarchyModal } from "@/components/AgentHierarchyModal";
import { AgentComplaintModal } from "@/components/AgentComplaintModal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

// Fetch all agents for hierarchy
const fetchAllAgents = async () => {
  const { data: agents, error } = await supabase
    .from("agents")
    .select(`
      *,
      agent_contacts (*)
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return agents as AgentWithContacts[];
};

// Format phone number for display
const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{5})(\d{6})/, '$1 $2');
};

const heroImages = [
  "/placeholder.svg",
  "/og-image.png",
  "/favicon.ico"
];

const Index = () => {
  // Query all agents for complete hierarchy data
  const { data: allAgents, isLoading } = useQuery({
    queryKey: ["all-agents"],
    queryFn: fetchAllAgents,
  });

  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const handleViewHierarchy = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsHierarchyModalOpen(true);
  };

  const handleComplaint = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsComplaintModalOpen(true);
  };

  // Filter master agents for display
  const masterAgents = allAgents?.filter(agent => agent.type === 'master_agent').slice(0, 5);

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          className="w-full h-full"
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
              <CarouselItem key={index} className="w-full h-[600px] relative">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${image})`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90">
                    <div className="container h-full flex items-center justify-center">
                      <div className="text-center space-y-6 animate-fade-in">
                        <h1 className="text-4xl md:text-6xl font-bold text-gradient">
                          Velki OFFICIAL WEBSITE
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                          Your trusted platform for gaming and entertainment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Quick Master Agents List */}
      <section className="container py-12">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            কুইক মাস্টার এজেন্ট লিস্ট
          </h2>
          {isLoading ? (
            <div>Loading agents...</div>
          ) : (
            <div className="space-y-4">
              {masterAgents?.map((agent) => (
                <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary/50 rounded-lg gap-4">
                  <div className="flex items-center gap-4">
                    <div className="agent-avatar">{agent.name[0]}</div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.agent_id}</p>
                      {agent.agent_contacts[0]?.whatsapp && (
                        <div className="flex items-center gap-2 mt-1">
                          <WhatsAppIcon />
                          <span className="text-sm">{formatPhoneNumber(agent.agent_contacts[0].whatsapp)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      onClick={() => handleViewHierarchy(agent)}
                    >
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">দেখুন</span>
                    </button>
                    <button 
                      className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
                      onClick={() => handleComplaint(agent)}
                    >
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-red-400">অভিযোগ</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Official Links */}
      <section className="container py-12">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5" />
            Official Links
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="#" className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-primary/20">
              <span>Main Website</span>
              <ExternalLink className="w-5 h-5" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-primary/20">
              <span>Live Portal</span>
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="container py-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Agent Categories</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3">Online Super Agent</h3>
            <p className="text-muted-foreground">
              Apply for super agent position through our official channels. Contact support for more information.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3">Online Master Agent</h3>
            <p className="text-muted-foreground">
              Join our master agent program with exclusive benefits and support.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3">Local Master Agent</h3>
            <p className="text-muted-foreground">
              Become a local master agent and grow your business in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/50 mt-12 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Company Head</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Admin List</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Super Agent</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Master Agent</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Our Networks</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Main Website</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Games Portal</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Portals</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Live Portal</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Club Portal</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Info Portal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Gambling Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-primary/20 text-center text-muted-foreground">
            <p>&copy; 2024 Velki. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AgentHierarchyModal
        open={isHierarchyModalOpen}
        onOpenChange={setIsHierarchyModalOpen}
        selectedAgent={selectedAgent}
        agents={allAgents || []}
      />
      <AgentComplaintModal
        open={isComplaintModalOpen}
        onOpenChange={setIsComplaintModalOpen}
        selectedAgent={selectedAgent}
        uplineAgent={null}
      />
    </div>
  );
};

export default Index;
