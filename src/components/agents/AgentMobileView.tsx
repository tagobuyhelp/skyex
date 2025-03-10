
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
  onComplaint,
}) => {
  return (
    <div key={agent.id} className="glass-card p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-sm">
          {agent.name[0].toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-sm">{agent.name}</p>
          <p className="text-xs text-gray-400">{getAgentTypeInBangla(agent.type)}</p>
        </div>
      </div>
      
      <div className="space-y-1.5 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs">আইডি:</span>
          <span className="px-1.5 py-0.5 bg-emerald-500/20 rounded text-emerald-400 font-medium text-xs">
            {agent.agent_id}
          </span>
        </div>
        
        {showUpline && agent.reports_to && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-xs">আপলাইন:</span>
            <div className="text-right">
              <p className="text-blue-400 text-xs">{getUplineInfo(agent.reports_to)?.name}</p>
              <p className="text-xs text-gray-400">{getAgentTypeInBangla(getUplineInfo(agent.reports_to)?.type || '')}</p>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-xs">যোগাযোগ:</span>
          {agent.agent_contacts[0]?.whatsapp ? (
            <WhatsAppButton whatsappNumber={agent.agent_contacts[0].whatsapp} />
          ) : (
            <span className="text-gray-500 text-xs">No contact</span>
          )}
        </div>
        
        <div className="flex justify-end gap-1.5 mt-2">
          <button 
            className="p-1.5 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1"
            onClick={() => onViewHierarchy(agent)}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-emerald-400">দেখুন</span>
          </button>
          {isAuthenticated && (
            <>
              <AgentManageModal
                mode="edit"
                agent={agent}
                trigger={
                  <button className="p-1.5 hover:bg-blue-500/20 rounded-lg transition-colors flex items-center gap-1">
                    <Edit className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-xs text-blue-400">এডিট</span>
                  </button>
                }
              />
              <button
                className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
                onClick={() => onDelete(agent)}
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span className="text-xs text-red-400">ডিলিট</span>
              </button>
            </>
          )}
          <button 
            className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
            onClick={() => onComplaint(agent)}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span className="text-xs text-red-400">অভিযোগ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
