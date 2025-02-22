import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { ArrowUpFromLine, ArrowDownFromLine, Star, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AgentHierarchyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgent: AgentWithContacts | null;
  agents: AgentWithContacts[];
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
        {/* Contact Information */}
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
          </div>

          {/* Downline Agents */}
          {downlineAgents.length > 0 && (
            <div className="space-y-3">
              <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-semibold flex items-center gap-2`}>
                <ArrowDownFromLine className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-emerald-400`} />
                Downline Agents
              </h3>
              <div className={`space-y-${isMobile ? '2' : '3'} animate-fade-in`}>
                {downlineAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} type="downline" />
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
