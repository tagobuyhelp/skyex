
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface AgentDownlineModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: AgentWithContacts | null;
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

export const AgentDownlineModal = ({
  open,
  onOpenChange,
  agent,
  agents,
}: AgentDownlineModalProps) => {
  const isMobile = useIsMobile();

  if (!agent) return null;

  const downlineAgents = agents.filter(a => a.reports_to === agent.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`
        max-w-xl 
        max-h-[90vh] 
        overflow-y-auto 
        ${isMobile ? 'p-4' : 'p-6'}
        scrollbar-thin 
        scrollbar-thumb-secondary 
        scrollbar-track-transparent
      `}>
        <DialogHeader>
          <DialogTitle className={isMobile ? 'text-xl' : 'text-2xl'}>
            ডাউনলাইন এজেন্ট লিস্ট
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {/* Agent Info */}
          <div className="mb-6 p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-medium text-xl">
                {agent.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-xl">{agent.name}</p>
                <p className="text-base text-muted-foreground">{getAgentTypeInBangla(agent.type)}</p>
                <p className="text-base text-primary">ID: {agent.agent_id}</p>
              </div>
            </div>
          </div>

          {/* Downline List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">ডাউনলাইন এজেন্ট ({downlineAgents.length})</h3>
            </div>
            
            {downlineAgents.length > 0 ? (
              <div className="space-y-3">
                {downlineAgents.map((downline) => (
                  <div key={downline.id} className="p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-lg">
                        {downline.name[0].toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-lg truncate">{downline.name}</p>
                        <p className="text-base text-muted-foreground">{getAgentTypeInBangla(downline.type)}</p>
                        <p className="text-base text-primary">ID: {downline.agent_id}</p>
                      </div>
                      {downline.agent_contacts[0]?.whatsapp && (
                        <a
                          href={`https://wa.me/${downline.agent_contacts[0].whatsapp}`}
                          className="flex items-center gap-1.5 text-base text-emerald-400 hover:text-emerald-300 transition-colors px-3 py-2 rounded-md hover:bg-emerald-500/20"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon />
                          <span className="hidden sm:inline">WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground text-lg">
                কোনো ডাউনলাইন এজেন্ট নেই
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
