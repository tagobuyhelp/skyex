
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

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

  // Filter to show only super agents in the table
  const superAgents = agents.filter(agent => agent.type === 'super_agent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="container py-8">Loading...</div>
      ) : (
        <AgentTable 
          agents={agents} // Pass full array for hierarchy lookup
          displayAgents={superAgents} // Only show super agents in the table
          title="VELKI সুপার এজেন্ট লিস্ট"
          filterSiteAdmins={false} // Don't filter out site admins since we need them for upline info
        />
      )}
    </div>
  );
};

export default SuperAgent;
