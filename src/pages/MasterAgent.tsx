import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomerSupport } from '@/components/CustomerSupport';

const fetchMasterAgents = async () => {
  const {
    data: uplines,
    error: uplinesError
  } = await supabase.from('agents').select(`
      *,
      agent_contacts (*)
    `).in('type', ['site_admin', 'sub_admin', 'super_agent']);
  if (uplinesError) throw uplinesError;
  const {
    data: masterAgents,
    error: masterAgentsError
  } = await supabase.from('agents').select(`
      *,
      agent_contacts (*)
    `).eq('type', 'master_agent');
  if (masterAgentsError) throw masterAgentsError;
  return [...(masterAgents || []), ...(uplines || [])] as AgentWithContacts[];
};

const MasterAgent = () => {
  const [showWarning, setShowWarning] = useState(true);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['master-agents-with-hierarchy'],
    queryFn: fetchMasterAgents
  });

  const masterAgents = agents.filter(agent => agent.type === 'master_agent');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container mx-auto px-2 sm:px-6 py-2 md:py-6">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowWarning(!showWarning)}
            className="absolute right-2 top-2 z-10"
          >
            {showWarning ? (
              <>
                <ChevronUp className="mr-1" />
                <span className="hidden sm:inline">সরান</span>
              </>
            ) : (
              <>
                <ChevronDown className="mr-1" />
                <span className="hidden sm:inline">দেখান</span>
              </>
            )}
          </Button>
          {showWarning && (
            <div className="glass-card p-4 sm:p-6 mb-6">
              <div className="flex gap-3 items-start">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" />
<<<<<<< HEAD
                <div className="space-y-3 text-sm sm:text-base">
                  <p className="font-semibold text-yellow-500">
                    এজেন্ট দের সাথে লেনদেন এর আগে স্কাইএক্স এর নিয়ম গুলো জেনে নিন!!
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <strong className="text-yellow-500 shrink-0">প্রতারনার হাত থেকে বাচতে সবার আগে ভিজিট করুন স্কাইএক্স সাইটঃ</strong>
                      <a href="https://skyex.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 break-all sm:break-normal">
                        SKYEX.COM
=======
                <div className="space-y-3">
                  <p className="warning-title text-yellow-500 font-semibold">
                    এজেন্ট দের সাথে লেনদেন এর আগে ভেল্কির নিয়ম গুলো জেনে নিন!!
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="warning-text flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <strong className="text-yellow-500 shrink-0">প্রতারনার হাত থেকে বাচতে সবার আগে ভিজিট করুন ভেল্কি সাইটঃ</strong>
                      <a 
                        href="https://velki.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-400 hover:text-blue-300 break-all sm:break-normal"
                      >
                        VELKI.COM
>>>>>>> 5cafc3614c46f0b611b403deef89c6985cacd2fe
                      </a>
                    </li>
                    <li className="warning-text">
                      <strong className="text-yellow-500">হোয়াটসঅ্যাপ ব্যাতিত অন্য কোন এপ এর মাধ্যমে যোগাযোগ বা লেনদেন করা যাবে না এবং করলে তা গ্রহনযোগ্য হবে না।</strong>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="text-center">Loading...</div>
<<<<<<< HEAD
          </div> : <AgentTable agents={agents} displayAgents={masterAgents} title="SKYEX মাস্টার এজেন্ট লিস্ট" filterSiteAdmins={false} />}
=======
          </div>
        ) : (
          <AgentTable 
            agents={agents}
            displayAgents={masterAgents}
            title="VELKI মাস্টার এজেন্ট লিস্ট"
            filterSiteAdmins={false}
          />
        )}
>>>>>>> 5cafc3614c46f0b611b403deef89c6985cacd2fe
      </div>
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default MasterAgent;
