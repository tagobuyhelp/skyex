import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { ExternalLink, Globe, MessageSquare, Phone, Shield, Users } from "lucide-react";

const fetchAgents = async () => {
  const { data: agents, error } = await supabase
    .from("agents")
    .select(`
      *,
      agent_contacts (*)
    `)
    .order("type")
    .limit(5);

  if (error) throw error;
  return agents as AgentWithContacts[];
};

const Index = () => {
  const { data: agents, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[400px] bg-gradient-to-r from-emerald-900 to-emerald-600">
        <div className="container h-full flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            LC247 OFFICIAL WEBSITE
          </h1>
        </div>
      </section>

      {/* Quick Agents List */}
      <section className="container py-12">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Quick Agent List
          </h2>
          {isLoading ? (
            <div>Loading agents...</div>
          ) : (
            <div className="space-y-4">
              {agents?.map((agent) => (
                <div key={agent.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="agent-avatar">{agent.name[0]}</div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.agent_id}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {agent.agent_contacts[0]?.whatsapp && (
                      <a href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`} className="p-2 hover:bg-white/10 rounded-lg">
                        <Phone className="w-5 h-5" />
                      </a>
                    )}
                    {agent.agent_contacts[0]?.messenger && (
                      <a href={agent.agent_contacts[0].messenger} className="p-2 hover:bg-white/10 rounded-lg">
                        <MessageSquare className="w-5 h-5" />
                      </a>
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
            <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10">
              <span>Main Website</span>
              <ExternalLink className="w-5 h-5" />
            </a>
            <a href="#" className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10">
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
            <p className="text-gray-400">
              Apply for super agent position through our official channels. Contact support for more information.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3">Online Master Agent</h3>
            <p className="text-gray-400">
              Join our master agent program with exclusive benefits and support.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-3">Local Master Agent</h3>
            <p className="text-gray-400">
              Become a local master agent and grow your business in your area.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 mt-12 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Company Head</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Admin List</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Super Agent</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Master Agent</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Our Networks</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Main Website</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Games Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Mobile App</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Portals</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Live Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Club Portal</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Info Portal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Policies</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Gambling Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 LC247. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
