
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { CustomerSupport } from '@/components/CustomerSupport';

const fetchMasterAgents = async () => {
  const { data: uplines, error: uplinesError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['site_admin', 'sub_admin', 'super_agent']);

  if (uplinesError) throw uplinesError;

  const { data: masterAgents, error: masterAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent');

  if (masterAgentsError) throw masterAgentsError;

  return [...(masterAgents || []), ...(uplines || [])] as AgentWithContacts[];
};

const MasterAgent = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['master-agents-with-hierarchy'],
    queryFn: fetchMasterAgents,
  });

  const masterAgents = agents.filter(agent => agent.type === 'master_agent');

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
          displayAgents={masterAgents}
          title="VELKI মাস্টার এজেন্ট লিস্ট"
          filterSiteAdmins={false}
        />
      )}
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default MasterAgent;
