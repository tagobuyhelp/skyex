
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { ArrowUpFromLine, ArrowDownFromLine } from "lucide-react";

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

export const AgentHierarchyModal = ({
  open,
  onOpenChange,
  selectedAgent,
  agents,
}: AgentHierarchyModalProps) => {
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Agent Hierarchy</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Upline Agents */}
          {uplineAgents.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ArrowUpFromLine className="w-5 h-5 text-blue-400" />
                Upline Agents
              </h3>
              <div className="space-y-2">
                {uplineAgents.reverse().map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                      {agent.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getAgentTypeInBangla(agent.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected Agent */}
          <div className="border-2 border-primary rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Selected Agent</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-medium text-lg">
                {selectedAgent.name[0].toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-lg">{selectedAgent.name}</p>
                <p className="text-muted-foreground">
                  {getAgentTypeInBangla(selectedAgent.type)}
                </p>
                <p className="text-sm text-primary">ID: {selectedAgent.agent_id}</p>
              </div>
            </div>
          </div>

          {/* Downline Agents */}
          {downlineAgents.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <ArrowDownFromLine className="w-5 h-5 text-emerald-400" />
                Downline Agents
              </h3>
              <div className="space-y-2">
                {downlineAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-4 p-3 bg-secondary/50 rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                      {agent.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {getAgentTypeInBangla(agent.type)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
