
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { AgentCard } from "@/components/AgentCard";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";

const fetchAgents = async () => {
  const { data: agents, error } = await supabase
    .from("agents")
    .select(`
      *,
      agent_contacts (*)
    `)
    .order("type");

  if (error) throw error;
  return agents as AgentWithContacts[];
};

const Index = () => {
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="text-center">Loading agents...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container py-8">
          <div className="text-center text-red-500">
            Error loading agents: {(error as Error).message}
          </div>
        </main>
      </div>
    );
  }

  const siteAdmins = agents?.filter((agent) => agent.type === "site_admin") || [];
  const subAdmins = agents?.filter((agent) => agent.type === "sub_admin") || [];
  const superAgents = agents?.filter((agent) => agent.type === "super_agent") || [];
  const masterAgents = agents?.filter((agent) => agent.type === "master_agent") || [];

  const renderAgentSection = (title: string, agents: AgentWithContacts[]) => {
    if (agents.length === 0) return null;
    
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              name={agent.name}
              id={agent.agent_id}
              type={agent.type}
              rating={agent.rating}
              contacts={{
                whatsapp: agent.agent_contacts[0]?.whatsapp || undefined,
                messenger: agent.agent_contacts[0]?.messenger || undefined,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container py-8">
        {renderAgentSection("Site Admins", siteAdmins)}
        {renderAgentSection("Sub Admins", subAdmins)}
        {renderAgentSection("Super Agents", superAgents)}
        {renderAgentSection("Master Agents", masterAgents)}
      </main>
    </div>
  );
};

export default Index;
