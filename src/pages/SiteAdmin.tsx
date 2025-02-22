
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

const fetchSiteAdmins = async () => {
  // First fetch site admins
  const { data: siteAdmins, error: siteAdminsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'site_admin');

  if (siteAdminsError) throw siteAdminsError;

  // Then fetch all potential downlines (sub admins, super agents, master agents)
  const { data: downlineAgents, error: downlineAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .in('type', ['sub_admin', 'super_agent', 'master_agent']);

  if (downlineAgentsError) throw downlineAgentsError;

  // Combine all data for hierarchy information
  return [...(siteAdmins || []), ...(downlineAgents || [])] as AgentWithContacts[];
};

const SiteAdmin = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['site-admins-with-hierarchy'],
    queryFn: fetchSiteAdmins,
  });

  // Get only site admins for display
  const siteAdmins = agents.filter(agent => agent.type === 'site_admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="container py-8">Loading...</div>
      ) : (
        <AgentTable 
          agents={agents} // Pass full array for hierarchy lookup
          displayAgents={siteAdmins} // Only show site admins in the table
          title="VELKI এডমিন লিস্ট" 
          showUpline={false} 
        />
      )}
    </div>
  );
};

export default SiteAdmin;
