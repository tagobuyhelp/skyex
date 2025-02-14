
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentWithContacts } from '@/types/agent';
import { Star, MessageSquare, Phone, Eye, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface AgentTableProps {
  agents: AgentWithContacts[];
  title: string;
  showUpline?: boolean;
}

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

export const AgentTable = ({ agents, title, showUpline = true }: AgentTableProps) => {
  // Filter out site_admin agents when displaying the table
  const displayAgents = agents.filter(agent => agent.type !== 'site_admin');
  
  // Helper function to find upline agent info
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
                      <Phone className="w-4 h-4 text-emerald-400" />
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
