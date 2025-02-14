
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';

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

  // Combine both sets of data so we have upline information available
  return [...(subAdmins || []), ...(siteAdmins || [])] as AgentWithContacts[];
};

const SubAdmin = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['sub-admins'],
    queryFn: fetchSubAdmins,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      {isLoading ? (
        <div className="container py-8">Loading...</div>
      ) : (
        <AgentTable 
          agents={agents} 
          title="LC247 সাব এডমিন লিস্ট"
          filterSiteAdmins={false} // Don't filter out site admins since we need them for upline info
        />
      )}
    </div>
  );
};

export default SubAdmin;
