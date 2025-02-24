
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AgentTable } from '@/components/AgentTable';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { CustomerSupport } from '@/components/CustomerSupport';
import { useToast } from "@/components/ui/use-toast";

const SubAdmin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showWarning, setShowWarning] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast({
          variant: "destructive",
          title: "অননুমোদিত অ্যাক্সেস",
          description: "অনুগ্রহ করে লগইন করুন",
        });
        navigate('/login');
        return;
      }

      const { data: agentData, error } = await supabase
        .from('agents')
        .select('type')
        .eq('id', session.user.id)
        .single();

      if (error || !agentData || (agentData.type !== 'site_admin' && agentData.type !== 'sub_admin')) {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "অননুমোদিত অ্যাক্সেস",
          description: "শুধুমাত্র এডমিনরা এই পেজ দেখতে পারবেন",
        });
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate, toast]);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['sub-admins-with-hierarchy'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          agent_contacts (*)
        `);

      if (error) throw error;
      return data as AgentWithContacts[];
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <AgentTable 
        agents={agents}
        displayAgents={agents.filter(agent => agent.type === 'sub_admin')}
        title="VELKI সাব এডমিন লিস্ট"
        filterSiteAdmins={false}
      />
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default SubAdmin;
