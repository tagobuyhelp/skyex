
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

  // Combine both sets of data so we have upline information available
  return [...(superAgents || []), ...(uplines || [])] as AgentWithContacts[];
};

const SuperAgent = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['super-agents'],
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
        <AgentTable agents={agents} title="LC247 সুপার এজেন্ট লিস্ট" />
      )}
    </div>
  );
};

export default SuperAgent;
