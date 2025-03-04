
import { Users, Eye, AlertTriangle } from "lucide-react";
import { AgentWithContacts } from "@/types/agent";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

interface MasterAgentSectionProps {
  masterAgents: AgentWithContacts[] | undefined;
  isLoading: boolean;
  onViewHierarchy: (agent: AgentWithContacts) => void;
  onComplaint: (agent: AgentWithContacts) => void;
}

const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{5})(\d{6})/, '$1 $2');
};

export const MasterAgentSection = ({ masterAgents, isLoading, onViewHierarchy, onComplaint }: MasterAgentSectionProps) => {
  return (
    <section className="container py-6 md:py-12 px-4">
      <div className="glass-card p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 md:w-6 md:h-6" />
          কুইক মাস্টার এজেন্ট লিস্ট
        </h2>
        {isLoading ? (
          <div>Loading agents...</div>
        ) : (
          <div className="space-y-3 md:space-y-4">
            {masterAgents?.map(agent => (
              <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg gap-3 md:gap-4">
                <div className="flex items-center gap-3">
                  <div className="agent-avatar text-lg md:text-xl">{agent.name[0]}</div>
                  <div>
                    <p className="font-medium text-base md:text-lg">{agent.name}</p>
                    <p className="px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-400 font-medium text-sm md:text-base inline-block">
                      {agent.agent_id}
                    </p>
                    {agent.agent_contacts[0]?.whatsapp && (
                      <div className="flex items-center gap-2 mt-1">
                        <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5" />
                        <span className="text-sm md:text-base">{formatPhoneNumber(agent.agent_contacts[0].whatsapp)}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button 
                    className="px-2.5 py-1.5 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap text-xs md:text-sm" 
                    onClick={() => onViewHierarchy(agent)}
                  >
                    <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-400" />
                    <span className="text-emerald-400">দেখুন</span>
                  </button>
                  <button 
                    className="px-2.5 py-1.5 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap text-xs md:text-sm" 
                    onClick={() => onComplaint(agent)}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 md:w-4 md:h-4 text-red-400" />
                    <span className="text-red-400">অভিযোগ</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
