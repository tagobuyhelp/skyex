import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentWithContacts } from '@/types/agent';
import { Eye, Edit, Trash2, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getAgentTypeInBangla } from './AgentUtils';
import { WhatsAppButton } from './WhatsAppButton';
import { AgentManageModal } from '../AgentManageModal';
interface AgentDesktopViewProps {
  agents: AgentWithContacts[];
  showUpline: boolean;
  isAuthenticated: boolean;
  getUplineInfo: (uplineId: string | null) => AgentWithContacts | null;
  onViewHierarchy: (agent: AgentWithContacts) => void;
  onDelete: (agent: AgentWithContacts) => void;
  onComplaint: (agent: AgentWithContacts) => void;
}
export const AgentDesktopView: React.FC<AgentDesktopViewProps> = ({
  agents,
  showUpline,
  isAuthenticated,
  getUplineInfo,
  onViewHierarchy,
  onDelete,
  onComplaint
}) => {
  return <Table>
      <TableHeader>
        <TableRow className="border-b border-white/10">
          <TableHead>নাম</TableHead>
          <TableHead>আইডি</TableHead>
          {showUpline && <TableHead>আপলাইন</TableHead>}
          <TableHead>যোগাযোগ</TableHead>
          <TableHead>অ্যাকশন</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {agents.map(agent => <TableRow key={agent.id} className="border-b border-white/10">
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
              <span className="px-2 py-0.5 bg-emerald-500/20 rounded font-medium text-gray-950">
                {agent.agent_id}
              </span>
            </TableCell>
            {showUpline && <TableCell>
                {agent.reports_to ? <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-4 h-4 text-blue-400" />
                    <div>
                      <p className="text-blue-600 text-sm">
                        {getUplineInfo(agent.reports_to)?.name}
                      </p>
                      <p className="text-gray-400 text-xs">
                        {getAgentTypeInBangla(getUplineInfo(agent.reports_to)?.type || '')}
                      </p>
                    </div>
                  </div> : <span className="text-gray-500">কোন আপলাইন নেই</span>}
              </TableCell>}
            <TableCell>
              {agent.agent_contacts[0]?.whatsapp ? <WhatsAppButton whatsappNumber={agent.agent_contacts[0].whatsapp} /> : <span className="text-gray-500">যোগাযোগের তথ্য নেই</span>}
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => onViewHierarchy(agent)} className="flex items-center gap-1.5">
                  <Eye className="h-4 w-4" />
                  <span>দেখুন</span>
                </Button>
                {isAuthenticated && <>
                    <AgentManageModal mode="edit" agent={agent} trigger={<Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                          <Edit className="h-4 w-4" />
                          <span>এডিট</span>
                        </Button>} />
                    <Button variant="ghost" size="sm" onClick={() => onDelete(agent)} className="flex items-center gap-1.5">
                      <Trash2 className="h-4 w-4" />
                      <span>ডিলিট</span>
                    </Button>
                  </>}
                <Button variant="ghost" size="sm" onClick={() => onComplaint(agent)} className="flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4" />
                  <span>অভিযোগ</span>
                </Button>
              </div>
            </TableCell>
          </TableRow>)}
      </TableBody>
    </Table>;
};