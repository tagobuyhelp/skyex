import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle } from 'lucide-react';

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
                <li className="flex flex-col space-y-1">
                  <strong className="text-yellow-500">এজেন্ট পাসোয়ার্ড পরিবর্তন করে দিলে</strong>
                  <span>আপনি একাউন্টে ঢুকে আবার পাসোয়ার্ড পরিবর্তন করে নিবেন। এজেন্ট যাতে কোন ভাবেই আপনার পাসোয়ার্ড না জানে। আপনার পাসোয়ার্ড আপনি কাউকেই দিবেন না - সে যেই হউক না কেন।</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <strong className="text-yellow-500">সকাল ৯ঃ৪৫ এর আগে এবং রাত ১০:৩০ এর পরে কোন ইউজার যদি এজেন্ট কে টাকা পাঠায়</strong>
                  <span>অই টাকার দায়ভার ভেল্কি নিবে না।</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <strong className="text-yellow-500">প্রতিবার এজেন্ট এর কাছ থেকে পয়েন্ট নেবার আগে</strong>
                  <span>এজেন্ট এর কাছে লেনদেন এর তথ্য জেনে নিতে হবে। যেহেতু এজেন্ট এক এক সময় এক ভাবে লেনদেন করে সেহেতু এই তথ্য জানা জরুরী।</span>
                </li>
                <li className="flex flex-col space-y-1">
                  <strong className="text-yellow-500">এজেন্ট এর বিরুদ্ধে কোন অভিযোগ থাকলে</strong>
                  <span>এজেন্ট এর নামের শেষে অভিযোগ বাটন এ ক্লিক করলে যে হোয়াটসঅ্যাপ নাম্বার আসবে - তাকে অভিযোগ করতে হবে।</span>
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
            displayAgents={masterAgents}
            title="VELKI মাস্টার এজেন্ট লিস্ট"
            filterSiteAdmins={false}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MasterAgent;
