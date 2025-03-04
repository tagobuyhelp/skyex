
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerSupport } from '@/components/CustomerSupport';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { Users, Shield, Star, Crown, TrendingUp, AlertTriangle, UserPlus, BellPlus, LogOut, User, Activity, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentManageModal } from '@/components/AgentManageModal';
import { NoticeManageModal } from '@/components/NoticeManageModal';
import { NoticeListStatic } from '@/components/NoticeListStatic';
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon: Icon, description, className }: {
  title: string;
  value: string | number;
  icon: any;
  description?: string;
  className?: string;
}) => (
  <Card className={cn("relative overflow-hidden transition-all hover:shadow-lg", className)}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="p-2 bg-primary/10 rounded-full">
        <Icon className="h-4 w-4 text-primary" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
      <div className="absolute bottom-0 right-0 w-16 h-16 -mb-6 -mr-6 rounded-full bg-primary/5" />
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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

  const siteAdmins = agents.filter(a => a.type === 'site_admin');
  const subAdmins = agents.filter(a => a.type === 'sub_admin');
  const superAgents = agents.filter(a => a.type === 'super_agent');
  const masterAgents = agents.filter(a => a.type === 'master_agent');

  const stats = {
    siteAdmins: siteAdmins.length,
    subAdmins: subAdmins.length,
    superAgents: superAgents.length,
    masterAgents: masterAgents.length,
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.rating && a.rating > 0).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#261F06] via-[#1A1704] to-[#261F06] text-foreground">
      <Header />
      <div className="container px-4 py-4 md:py-8">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-lg bg-white/5 p-4 md:p-6 rounded-lg border border-white/10">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">এডমিন ড্যাশবোর্ড</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              সমস্ত এজেন্টের বিস্তারিত তথ্য এবং পরিসংখ্যান দেখুন
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4 w-full md:w-auto">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <NoticeManageModal
                trigger={
                  <Button variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border-white/10">
                    <BellPlus className="w-4 h-4 mr-2" />
                    নতুন বিজ্ঞপ্তি
                  </Button>
                }
              />
              <AgentManageModal 
                mode="create"
                onSuccess={handleAgentCreate}
                trigger={
                  <Button className="w-full sm:w-auto bg-primary/90 hover:bg-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    নতুন এজেন্ট
                  </Button>
                }
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                {userEmail && (
                  <>
                    <DropdownMenuItem className="font-medium">
                      {userEmail}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  লগ আউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-[200px]">
            <div className="text-center text-muted-foreground">লোড হচ্ছে...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              <StatCard
                title="মোট এজেন্ট"
                value={stats.totalAgents}
                icon={Users}
                description="সক্রিয় এজেন্ট সংখ্যা"
                className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20"
              />
              <StatCard
                title="সাইট এডমিন"
                value={stats.siteAdmins}
                icon={Shield}
                description="সর্বোচ্চ অনুমতিপ্রাপ্ত এডমিন"
                className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20"
              />
              <StatCard
                title="সাব এডমিন"
                value={stats.subAdmins}
                icon={Star}
                description="দ্বিতীয় পর্যায়ের এডমিন"
                className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20"
              />
              <StatCard
                title="সুপার এজেন্ট"
                value={stats.superAgents}
                icon={Crown}
                description="বিশেষ অনুমতিপ্রাপ্ত এজেন্ট"
                className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 border-emerald-500/20"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm col-span-1 lg:col-span-2 border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    সাম্প্রতিক বিজ্ঞপ্তি
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 md:pt-6">
                  <NoticeListStatic />
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-base md:text-lg flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-primary" />
                    দ্রুত অ্যাকশন
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 md:pt-6">
                  <div className="space-y-2">
                    <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      নতুন এজেন্ট যোগ করুন
                    </button>
                    <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-primary" />
                      অভিযোগ তালিকা দেখুন
                    </button>
                    <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      সিস্টেম সেটিংস
                    </button>
                  </div>
                </CardContent>
              </Card>
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
