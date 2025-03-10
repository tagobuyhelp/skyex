import React from 'react';
import { AgentWithContacts } from '@/types/agent';
import { Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { getAgentTypeInBangla } from './AgentUtils';
import { WhatsAppButton } from './WhatsAppButton';
import { AgentManageModal } from '../AgentManageModal';
interface AgentMobileViewProps {
  agent: AgentWithContacts;
  showUpline: boolean;
  isAuthenticated: boolean;
  getUplineInfo: (uplineId: string | null) => AgentWithContacts | null;
  onViewHierarchy: (agent: AgentWithContacts) => void;
  onDelete: (agent: AgentWithContacts) => void;
  onComplaint: (agent: AgentWithContacts) => void;
}
export const AgentMobileView: React.FC<AgentMobileViewProps> = ({
  agent,
  showUpline,
  isAuthenticated,
  getUplineInfo,
  onViewHierarchy,
  onDelete,
  onComplaint
}) => {
  return <div key={agent.id} className="glass-card p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-base">
          {agent.name[0].toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-base">{agent.name}</p>
          <p className="text-sm text-gray-400">{getAgentTypeInBangla(agent.type)}</p>
        </div>
      </div>
      
      <div className="space-y-2 text-base">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">আইডি:</span>
          <span className="px-2 py-0.5 bg-emerald-500/20 rounded font-medium text-sm text-orange-400">
            {agent.agent_id}
          </span>
        </div>
        
        {showUpline && agent.reports_to && <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">আপলাইন:</span>
            <div className="text-right">
              <p className="text-blue-400 text-sm">{getUplineInfo(agent.reports_to)?.name}</p>
              <p className="text-sm text-gray-400">{getAgentTypeInBangla(getUplineInfo(agent.reports_to)?.type || '')}</p>
            </div>
          </div>}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm">যোগাযোগ:</span>
          {agent.agent_contacts[0]?.whatsapp ? <WhatsAppButton whatsappNumber={agent.agent_contacts[0].whatsapp} /> : <span className="text-gray-500 text-sm">No contact</span>}
        </div>
        
        <div className="flex justify-end gap-2 mt-3">
          <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1.5" onClick={() => onViewHierarchy(agent)}>
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">দেখুন</span>
          </button>
          {isAuthenticated && <>
              <AgentManageModal mode="edit" agent={agent} trigger={<button className="p-2 hover:bg-blue-500/20 rounded-lg transition-colors flex items-center gap-1.5">
                    <Edit className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">এডিট</span>
                  </button>} />
              <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1.5" onClick={() => onDelete(agent)}>
                <Trash2 className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400">ডিলিট</span>
              </button>
            </>}
          <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1.5" onClick={() => onComplaint(agent)}>
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-400">অভিযোগ</span>
          </button>
        </div>
      </div>
    </div>;
};