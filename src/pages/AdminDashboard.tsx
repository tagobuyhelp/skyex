
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerSupport } from '@/components/CustomerSupport';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { useToast } from "@/components/ui/use-toast";
import { useLoading } from "@/components/LoadingProvider";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardStatsGrid } from '@/components/dashboard/DashboardStatsGrid';
import { NoticesSection } from '@/components/dashboard/NoticesSection';
import { QuickActions } from '@/components/dashboard/QuickActions';

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { startLoading, stopLoading } = useLoading();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login');
      }
      setUserEmail(session?.user?.email || null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserEmail(session?.user?.email || null);
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "লগআউট ব্যর্থ হয়েছে",
        description: error.message,
      });
    }
  };

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['all-agents-dashboard'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          agent_contacts (*)
        `);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "এজেন্ট লোড করতে ব্যর্থ হয়েছে",
          description: error.message,
        });
        throw error;
      }
      return data as AgentWithContacts[];
    },
  });

  useEffect(() => {
    if (isLoading) {
      startLoading("Loading agent data...");
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  const handleAgentUpdate = () => {
    toast({
      title: "এজেন্ট আপডেট করা হয়েছে",
      description: "এজেন্টের তথ্য সফলভাবে আপডেট করা হয়েছে।",
    });
  };

  const handleAgentCreate = () => {
    toast({
      title: "নতুন এজেন্ট যোগ করা হয়েছে",
      description: "নতুন এজেন্ট সফলভাবে যোগ করা হয়েছে।",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <div className="container px-4 py-4 md:py-8">
        <DashboardHeader 
          userEmail={userEmail}
          onAgentUpdate={handleAgentUpdate}
          onAgentCreate={handleAgentCreate}
          onLogout={handleLogout}
        />

        {!isLoading && (
          <>
            <DashboardStatsGrid agents={agents} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <NoticesSection />
              <QuickActions />
            </div>
          </>
        )}
      </div>
      <Footer />
      <CustomerSupport />
    </div>
  );
};

export default AdminDashboard;
