
import { Users, Shield, Star, Crown } from 'lucide-react';
import { AgentWithContacts } from '@/types/agent';
import { StatCard } from './StatCard';

interface DashboardStatsGridProps {
  agents: AgentWithContacts[];
}

export const DashboardStatsGrid = ({ agents }: DashboardStatsGridProps) => {
  const siteAdmins = agents.filter(a => a.type === 'site_admin');
  const subAdmins = agents.filter(a => a.type === 'sub_admin');
  const superAgents = agents.filter(a => a.type === 'super_agent');
  const masterAgents = agents.filter(a => a.type === 'master_agent');

  const stats = {
    totalAgents: agents.length,
    siteAdmins: siteAdmins.length,
    subAdmins: subAdmins.length,
    superAgents: superAgents.length,
    masterAgents: masterAgents.length,
    activeAgents: agents.filter(a => a.rating && a.rating > 0).length,
  };

  return (
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
  );
};
