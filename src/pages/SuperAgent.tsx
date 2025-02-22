
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle } from 'lucide-react';

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

  // Finally fetch master agents (potential downlines)
  const { data: masterAgents, error: masterAgentsError } = await supabase
    .from('agents')
    .select(`
      *,
      agent_contacts (*)
    `)
    .eq('type', 'master_agent');

  if (masterAgentsError) throw masterAgentsError;

  // Combine all data for complete hierarchy information
  return [
    ...(superAgents || []), 
    ...(uplines || []), 
    ...(masterAgents || [])
  ] as AgentWithContacts[];
};

const SuperAgent = () => {
  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['super-agents-with-hierarchy'],
    queryFn: fetchSuperAgents,
  });

  // Filter to show only super agents in the table
  const superAgents = agents.filter(agent => agent.type === 'super_agent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container py-4 md:py-6">
        <div className="glass-card p-4 md:p-6 mb-6">
          <div className="flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
            <div className="space-y-3 text-sm">
              <p className="font-semibold text-yellow-500">
                এজেন্ট দের সাথে লেনদেন এর আগে ভেল্কির নিয়ম গুলো জেনে নিন!!
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <strong className="text-yellow-500">প্রতারনার হাত থেকে বাচতে সবার আগে ভিজিট করুন ভেল্কি সাইটঃ</strong>{" "}
                  <a href="https://velki.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
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
          <div className="container py-8">Loading...</div>
        ) : (
          <AgentTable 
            agents={agents}
            displayAgents={superAgents}
            title="VELKI সুপার এজেন্ট লিস্ট"
            filterSiteAdmins={false}
          />
        )}
      </div>
    </div>
  );
};

export default SuperAgent;
