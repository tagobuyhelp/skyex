
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

const fetchMasterAgents = async () => {
  // First, fetch all potential uplines (site admins, sub admins, and super agents)
  const { data: uplines, error: uplinesError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['site_admin', 'sub_admin', 'super_agent']);

  if (uplinesError) throw uplinesError;

  // Then fetch master agents
  const { data: masterAgents, error: masterAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent');

  if (masterAgentsError) throw masterAgentsError;

  // Combine both sets of data so we have upline information available
  return [...(masterAgents || []), ...(uplines || [])] as AgentWithContacts[];
};

const MasterAgent = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['master-agents'],
    queryFn: fetchMasterAgents,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="container py-8">Loading...</div>
      ) : (
        <AgentTable 
          agents={agents} 
          title="VELKI মাস্টার এজেন্ট লিস্ট"
          filterSiteAdmins={false} // Don't filter out site admins since we need them for upline info
        />
      )}
    </div>
  );
};

export default MasterAgent;
