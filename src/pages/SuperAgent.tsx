
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { CustomerSupport } from '@/components/CustomerSupport';

const fetchSuperAgents = async () => {
  // First, fetch all potential uplines (site admins and sub admins)
  const { data: uplines, error: uplinesError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['site_admin', 'sub_admin']);

  if (uplinesError) throw uplinesError;

  // Then fetch super agents
  const { data: superAgents, error: superAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'super_agent');

  if (superAgentsError) throw superAgentsError;

  // Finally fetch master agents (potential downlines)
  const { data: masterAgents, error: masterAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent');

  if (masterAgentsError) throw masterAgentsError;

  // Combine all data for complete hierarchy information
  return [
    ...(superAgents || []), 
    ...(uplines || []), 
    ...(masterAgents || [])
  ] as AgentWithContacts[];
};

const SuperAgent = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['super-agents-with-hierarchy'],
    queryFn: fetchSuperAgents,
  });

  const superAgents = agents.filter(agent => agent.type === 'super_agent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-center">Loading...</div>
        </div>
      ) : (
        <AgentTable 
          agents={agents}
          displayAgents={superAgents}
          title="VELKI সুপার এজেন্ট লিস্ট"
          filterSiteAdmins={false}
        />
      )}
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default SuperAgent;
