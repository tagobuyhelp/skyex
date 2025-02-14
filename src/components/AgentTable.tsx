
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentWithContacts } from '@/types/agent';
import { Star, MessageSquare, Phone, Eye, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface AgentTableProps {
  agents: AgentWithContacts[];
  title: string;
  showUpline?: boolean;
}

export const AgentTable = ({ agents, title, showUpline = true }: AgentTableProps) => {
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
            {agents.map((agent) => (
              <TableRow key={agent.id} className="border-b border-white/10">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                      {agent.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-gray-400">{agent.type}</p>
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
                        <span className="text-blue-400">
                          {agents.find(a => a.id === agent.reports_to)?.name || 'Unknown'}
                        </span>
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
                  <div className="flex gap-2">
                    {agent.agent_contacts[0]?.whatsapp && (
                      <a
                        href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                        className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Phone className="w-4 h-4 text-emerald-400" />
                      </a>
                    )}
                    {agent.agent_contacts[0]?.messenger && (
                      <a
                        href={agent.agent_contacts[0].messenger}
                        className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageSquare className="w-4 h-4 text-blue-400" />
                      </a>
                    )}
                  </div>
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
