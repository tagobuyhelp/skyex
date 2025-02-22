
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle } from 'lucide-react';

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

  // Combine all sets of data to have complete hierarchy information
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

  // Filter to show only sub admins in the table
  const subAdmins = agents.filter(agent => agent.type === 'sub_admin');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container mx-auto px-2 sm:px-6 py-2 md:py-6">
        <div className="glass-card p-4 sm:p-6 mb-6">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div className="space-y-3 text-sm sm:text-base">
              <p className="font-semibold text-yellow-500">
                এজেন্ট দের সাথে লেনদেন এর আগে ভেল্কির নিয়ম গুলো জেনে নিন!!
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <strong className="text-yellow-500 shrink-0">প্রতারনার হাত থেকে বাচতে সবার আগে ভিজিট করুন ভেল্কি সাইটঃ</strong>
                  <a 
                    href="https://velki.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-400 hover:text-blue-300 break-all sm:break-normal"
                  >
                    VELKI.COM
                  </a>
                </li>
                <li>
                  <strong className="text-yellow-500">হোয়াটসঅ্যাপ ব্যাতিত অন্য কোন এপ এর মাধ্যমে যোগাযোগ বা লেনদেন করা যাবে না এবং করলে তা গ্রহনযোগ্য হবে না।</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
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
      </div>
      <Footer />
    </div>
  );
};

export default SubAdmin;
