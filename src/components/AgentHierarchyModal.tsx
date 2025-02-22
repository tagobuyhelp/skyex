
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { ArrowUpFromLine, ArrowDownFromLine, Users } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useState } from "react";
import { AgentDownlineModal } from "./AgentDownlineModal";

interface AgentHierarchyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgent: AgentWithContacts | null;
  agents: AgentWithContacts[];
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

const AgentCard = ({ agent, type }: { agent: AgentWithContacts; type: 'upline' | 'selected' | 'downline' }) => {
  const isMobile = useIsMobile();
  const colors = {
    upline: 'bg-blue-600',
    selected: 'bg-primary',
    downline: 'bg-emerald-600'
  };

  return (
    <div 
      className={`${
        type === 'selected' 
          ? 'border-2 border-primary shadow-lg shadow-primary/20' 
          : 'bg-secondary/50'
      } p-4 rounded-lg transition-all hover:bg-secondary/70`}
    >
      <div className="flex items-center gap-4">
        <div className={`${
          isMobile ? 'w-10 h-10' : 'w-12 h-12'
        } rounded-full ${colors[type]} flex items-center justify-center text-white font-medium text-lg shrink-0`}>
          {agent.name[0].toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <p className={`font-medium ${isMobile ? 'text-base' : 'text-lg'} truncate`}>{agent.name}</p>
          <p className="text-muted-foreground text-sm">
            {getAgentTypeInBangla(agent.type)}
          </p>
          <p className="text-sm text-primary">ID: {agent.agent_id}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="space-y-1">
          <span className="text-sm text-muted-foreground">Contact:</span>
          <div className="flex flex-wrap gap-2">
            {agent.agent_contacts[0]?.whatsapp && (
              <a
                href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                className="flex items-center gap-1 text-sm text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-500/10 px-2 py-1 rounded-md hover:bg-emerald-500/20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                <span className="truncate">{agent.agent_contacts[0].whatsapp}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const AgentHierarchyModal = ({
  open,
  onOpenChange,
  selectedAgent,
  agents,
}: AgentHierarchyModalProps) => {
  const isMobile = useIsMobile();
  const [isDownlineModalOpen, setIsDownlineModalOpen] = useState(false);

  if (!selectedAgent) return null;

  const findUplineAgents = (agent: AgentWithContacts): AgentWithContacts[] => {
    const uplineAgents: AgentWithContacts[] = [];
    let currentAgent = agent;

    while (currentAgent.reports_to) {
      const upline = agents.find(a => a.id === currentAgent.reports_to);
      if (upline) {
        uplineAgents.push(upline);
        currentAgent = upline;
      } else {
        break;
      }
    }

    return uplineAgents;
  };

  const findDownlineAgents = (agentId: string): AgentWithContacts[] => {
    return agents.filter(agent => agent.reports_to === agentId);
  };

  const uplineAgents = findUplineAgents(selectedAgent);
  const downlineAgents = findDownlineAgents(selectedAgent.id);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className={`
          max-w-2xl 
          max-h-[90vh] 
          overflow-y-auto 
          ${isMobile ? 'p-4' : 'p-6'}
          scrollbar-thin 
          scrollbar-thumb-secondary 
          scrollbar-track-transparent
        `}>
          <DialogHeader>
            <DialogTitle className={isMobile ? 'text-lg' : 'text-xl'}>Agent Hierarchy</DialogTitle>
          </DialogHeader>

          <div className={`space-y-6 ${isMobile ? 'py-3' : 'py-4'}`}>
            {/* Upline Agents */}
            {uplineAgents.length > 0 && (
              <div className="space-y-3">
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold flex items-center gap-2`}>
                  <ArrowUpFromLine className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-blue-400`} />
                  Upline Agents
                </h3>
                <div className={`space-y-${isMobile ? '2' : '3'} animate-fade-in`}>
                  {uplineAgents.reverse().map((agent) => (
                    <AgentCard key={agent.id} agent={agent} type="upline" />
                  ))}
                </div>
              </div>
            )}

            {/* Selected Agent */}
            <div className="animate-fade-in">
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold mb-3`}>Selected Agent</h3>
              <AgentCard agent={selectedAgent} type="selected" />
              
              {/* View Downline Button */}
              <div className="mt-4">
                <button
                  onClick={() => setIsDownlineModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-colors"
                >
                  <Users className="w-4 h-4" />
                  <span>ডাউনলাইন দেখুন</span>
                  <span className="px-2 py-0.5 bg-emerald-500/30 rounded-full text-sm">
                    {downlineAgents.length}
                  </span>
                </button>
              </div>
            </div>

            {/* Downline Agents Preview */}
            {downlineAgents.length > 0 && (
              <div className="space-y-3">
                <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold flex items-center gap-2`}>
                  <ArrowDownFromLine className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-emerald-400`} />
                  Downline Preview
                </h3>
                <div className={`space-y-${isMobile ? '2' : '3'} animate-fade-in`}>
                  {downlineAgents.slice(0, 2).map((agent) => (
                    <AgentCard key={agent.id} agent={agent} type="downline" />
                  ))}
                  {downlineAgents.length > 2 && (
                    <button
                      onClick={() => setIsDownlineModalOpen(true)}
                      className="w-full py-3 px-4 bg-secondary/50 rounded-lg text-muted-foreground hover:bg-secondary/70 transition-colors text-sm"
                    >
                      + {downlineAgents.length - 2} আরো এজেন্ট দেখুন
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AgentDownlineModal
        open={isDownlineModalOpen}
        onOpenChange={setIsDownlineModalOpen}
        agent={selectedAgent}
        agents={agents}
      />
    </>
  );
};
