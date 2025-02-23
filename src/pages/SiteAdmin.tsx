
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { CustomerSupport } from '@/components/CustomerSupport';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

const fetchSiteAdmins = async () => {
  // First, fetch site admins
  const { data: siteAdmins, error: siteAdminsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'site_admin');

  if (siteAdminsError) throw siteAdminsError;

  // Then fetch all their downline agents
  const { data: downlineAgents, error: downlineAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['sub_admin', 'super_agent', 'master_agent']);

  if (downlineAgentsError) throw downlineAgentsError;

  return [...(siteAdmins || []), ...(downlineAgents || [])] as AgentWithContacts[];
};

const SiteAdmin = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['site-admins-with-hierarchy'],
    queryFn: fetchSiteAdmins,
  });

  const siteAdmins = agents.filter(agent => agent.type === 'site_admin');

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
          displayAgents={siteAdmins}
          title="VELKI সাইট এডমিন লিস্ট"
          showUpline={false}
        />
      )}
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default SiteAdmin;
