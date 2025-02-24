
import { useQuery } from '@tanstack/react-query';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomerSupport } from '@/components/CustomerSupport';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { Users, Shield, Star, Crown, TrendingUp, AlertTriangle, UserPlus, BellPlus, LogOut, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentManageModal } from '@/components/AgentManageModal';
import { NoticeManageModal } from '@/components/NoticeManageModal';
import { NoticeList } from '@/components/NoticeList';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon: Icon, description }: {
  title: string;
  value: string | number;
  icon: any;
  description?: string;
}) => (
  <Card className="bg-card/50 backdrop-blur-sm">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && (
        <p className="text-xs text-muted-foreground mt-1">{description}</p>
      )}
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

    // Get initial session
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

  // Organize agents by type for stats
  const siteAdmins = agents.filter(a => a.type === 'site_admin');
  const subAdmins = agents.filter(a => a.type === 'sub_admin');
  const superAgents = agents.filter(a => a.type === 'super_agent');
  const masterAgents = agents.filter(a => a.type === 'master_agent');

  // Calculate stats
  const stats = {
    siteAdmins: siteAdmins.length,
    subAdmins: subAdmins.length,
    superAgents: superAgents.length,
    masterAgents: masterAgents.length,
    totalAgents: agents.length,
    activeAgents: agents.filter(a => a.rating && a.rating > 0).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />
      <div className="container px-4 py-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">এডমিন ড্যাশবোর্ড</h1>
            <p className="text-muted-foreground">
              সমস্ত এজেন্টের বিস্তারিত তথ্য এবং পরিসংখ্যান দেখুন
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <NoticeManageModal
                trigger={
                  <Button variant="outline">
                    <BellPlus className="w-4 h-4 mr-2" />
                    নতুন বিজ্ঞপ্তি
                  </Button>
                }
              />
              <AgentManageModal 
                mode="create"
                onSuccess={handleAgentCreate}
                trigger={
                  <Button>
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              <StatCard
                title="মোট এজেন্ট"
                value={stats.totalAgents}
                icon={Users}
                description="সক্রিয় এজেন্ট সংখ্যা"
              />
              <StatCard
                title="সাইট এডমিন"
                value={stats.siteAdmins}
                icon={Shield}
                description="সর্বোচ্চ অনুমতিপ্রাপ্ত এডমিন"
              />
              <StatCard
                title="সাব এডমিন"
                value={stats.subAdmins}
                icon={Star}
                description="দ্বিতীয় পর্যায়ের এডমিন"
              />
              <StatCard
                title="সুপার এজেন্ট"
                value={stats.superAgents}
                icon={Crown}
                description="বিশেষ অনুমতিপ্রাপ্ত এজেন্ট"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card className="bg-card/50 backdrop-blur-sm col-span-full lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">সাম্প্রতিক বিজ্ঞপ্তি</CardTitle>
                </CardHeader>
                <CardContent>
                  <NoticeList />
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">দ্রুত অ্যাকশন</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      নতুন এজেন্ট যোগ করুন
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      অভিযোগ তালিকা দেখুন
                    </button>
                    <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-primary/20 transition-colors text-sm flex items-center gap-2">
                      <Shield className="w-4 h-4" />
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
