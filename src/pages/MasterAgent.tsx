
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle } from 'lucide-react';

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
    queryKey: ['master-agents-with-hierarchy'],
    queryFn: fetchMasterAgents,
  });

  // Filter to show only master agents in the table
  const masterAgents = agents.filter(agent => agent.type === 'master_agent');

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
                <li>
                  <strong className="text-yellow-500">এজেন্ট পাসোয়ার্ড পরিবর্তন করে দিলে</strong> - আপনি একাউন্টে ঢুকে আবার পাসোয়ার্ড পরিবর্তন করে নিবেন। এজেন্ট যাতে কোন ভাবেই আপনার পাসোয়ার্ড না জানে। আপনার পাসোয়ার্ড আপনি কাউকেই দিবেন না - সে যেই হউক না কেন।
                </li>
                <li>
                  <strong className="text-yellow-500">সকাল ৯ঃ৪৫ এর আগে এবং রাত ১০:৩০ এর পরে কোন ইউজার যদি এজেন্ট কে টাকা পাঠায়</strong> – অই টাকার দায়ভার ভেল্কি নিবে না।
                </li>
                <li>
                  <strong className="text-yellow-500">প্রতিবার এজেন্ট এর কাছ থেকে পয়েন্ট নেবার আগে</strong> – এজেন্ট এর কাছে লেনদেন এর তথ্য জেনে নিতে হবে। যেহেতু এজেন্ট এক এক সময় এক ভাবে লেনদেন করে সেহেতু এই তথ্য জানা জরুরী।
                </li>
                <li>
                  <strong className="text-yellow-500">এজেন্ট এর বিরুদ্ধে কোন অভিযোগ থাকলে</strong> এজেন্ট এর নামের শেষে অভিযোগ বাটন এ ক্লিক করলে যে হোয়াটসঅ্যাপ নাম্বার আসবে - তাকে অভিযোগ করতে হবে।
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
            displayAgents={masterAgents}
            title="VELKI মাস্টার এজেন্ট লিস্ট"
            filterSiteAdmins={false}
          />
        )}
      </div>
    </div>
  );
};

export default MasterAgent;
