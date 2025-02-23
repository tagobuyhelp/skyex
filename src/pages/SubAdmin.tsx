
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { CustomerSupport } from '@/components/CustomerSupport';

const fetchSubAdmins = async () => {
  // First, fetch all site admins (potential uplines)
  const { data: siteAdmins, error: siteAdminsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'site_admin');

  if (siteAdminsError) throw siteAdminsError;

  // Then fetch sub admins
  const { data: subAdmins, error: subAdminsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'sub_admin');

  if (subAdminsError) throw subAdminsError;

  // Finally fetch super agents and master agents (potential downlines)
  const { data: downlineAgents, error: downlineAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['super_agent', 'master_agent']);

  if (downlineAgentsError) throw downlineAgentsError;

  // Combine all data for complete hierarchy information
  return [
    ...(subAdmins || []), 
    ...(siteAdmins || []), 
    ...(downlineAgents || [])
  ] as AgentWithContacts[];
};

const SubAdmin = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['sub-admins-with-hierarchy'],
    queryFn: fetchSubAdmins,
  });

  const subAdmins = agents.filter(agent => agent.type === 'sub_admin');

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
          displayAgents={subAdmins}
          title="VELKI সাব এডমিন লিস্ট"
          filterSiteAdmins={false}
        />
      )}
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default SubAdmin;
