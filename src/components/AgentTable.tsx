import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentWithContacts } from '@/types/agent';
import { Star, Eye, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface AgentTableProps {
  agents: AgentWithContacts[];
  title: string;
  showUpline?: boolean;
  filterSiteAdmins?: boolean;
}

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="currentColor"
    className="text-emerald-400"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const getAgentTypeInBangla = (type: string) => {
  switch (type) {
    case 'site_admin':
      return 'সাইট এডমিন';
    case 'sub_admin':
      return 'সাব এডমিন';
    case 'super_agent':
      return 'সুপার এজেন্ট';
    case 'master_agent':
      return 'মাস্টার এজেন্ট';
    default:
      return type;
  }
};

export const AgentTable = ({ agents, title, showUpline = true, filterSiteAdmins = true }: AgentTableProps) => {
  const currentPageType = title.includes('সুপার') ? 'super_agent' 
    : title.includes('মাস্টার') ? 'master_agent'
    : title.includes('এডমিন') ? 'site_admin'
    : title.includes('সাব') ? 'sub_admin'
    : null;

  const displayAgents = currentPageType
    ? agents.filter(agent => agent.type === currentPageType)
    : filterSiteAdmins 
      ? agents.filter(agent => agent.type !== 'site_admin')
      : agents;
  
  const getUplineInfo = (uplineId: string | null) => {
    if (!uplineId) return null;
    const uplineAgent = agents.find(a => a.id === uplineId);
    if (!uplineAgent) return null;
    return {
      name: uplineAgent.name,
      type: getAgentTypeInBangla(uplineAgent.type)
    };
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-center text-white mb-8">{title}</h1>
      <div className="glass-card">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead>নাম</TableHead>
              <TableHead>আইডি</TableHead>
              {showUpline && <TableHead>আপলাইন</TableHead>}
              <TableHead>রেটিং</TableHead>
              <TableHead>যোগাযোগ</TableHead>
              <TableHead>অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAgents.map((agent) => (
              <TableRow key={agent.id} className="border-b border-white/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                      {agent.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-400">{getAgentTypeInBangla(agent.type)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-emerald-400">{agent.agent_id}</span>
                </TableCell>
                {showUpline && (
                  <TableCell>
                    {agent.reports_to ? (
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-blue-400">
                            {getUplineInfo(agent.reports_to)?.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {getUplineInfo(agent.reports_to)?.type}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">No upline</span>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < (agent.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  {agent.agent_contacts[0]?.whatsapp ? (
                    <div className="flex items-center gap-2">
                      <WhatsAppIcon />
                      <a
                        href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {agent.agent_contacts[0].whatsapp}
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500">No contact</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors">
                      <Eye className="w-4 h-4 text-emerald-400" />
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
