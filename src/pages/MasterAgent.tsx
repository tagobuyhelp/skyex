
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

const fetchMasterAgents = async () => {
  const { data, error } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent');

  if (error) throw error;
  return data as AgentWithContacts[];
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
        <AgentTable agents={agents} title="LC247 মাস্টার এজেন্ট লিস্ট" />
      )}
    </div>
  );
};

export default MasterAgent;
