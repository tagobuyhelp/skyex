
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

const fetchSiteAdmins = async () => {
  const { data, error } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'site_admin');

  if (error) throw error;
  return data as AgentWithContacts[];
};

const SiteAdmin = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['site-admins'],
    queryFn: fetchSiteAdmins,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="container py-8">Loading...</div>
      ) : (
        <AgentTable 
          agents={agents} 
          title="LC247 এডমিন লিস্ট" 
          showUpline={false} 
          filterSiteAdmins={false} 
        />
      )}
    </div>
  );
};

export default SiteAdmin;
