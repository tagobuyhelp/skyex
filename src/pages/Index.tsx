
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { ExternalLink, Globe, MessageSquare, Phone, Shield, Users } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";

const fetchRandomMasterAgents = async () => {
  const { data: agents, error } = await supabase
    .from("agents")
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return agents as AgentWithContacts[];
};

// Format phone number for display
const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{5})(\d{6})/, '$1 $2');
};

const Index = () => {
  const { data: agents, isLoading } = useQuery({
    queryKey: ["random-master-agents"],
    queryFn: fetchRandomMasterAgents,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-primary/20 via-primary/10 to-background">
        <div className="container h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            Velki OFFICIAL WEBSITE
          </h1>
        </div>
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
              {agents?.map((agent) => (
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
                  <div className="flex gap-3 items-center">
                    {agent.agent_contacts[0]?.whatsapp && (
                      <Button 
                        variant="secondary"
                        className="flex items-center gap-2"
                        asChild
                      >
                        <a 
                          href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon />
                          Contact Now
                        </a>
                      </Button>
                    )}
                    {agent.agent_contacts[0]?.messenger && (
                      <Button
                        variant="secondary"
                        size="icon"
                        asChild
                      >
                        <a 
                          href={agent.agent_contacts[0].messenger}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-primary/20 rounded-lg"
                        >
                          <MessageSquare className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
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
    </div>
  );
};

export default Index;
