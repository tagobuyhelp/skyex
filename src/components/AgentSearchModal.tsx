import { useState } from 'react';
import { Search, AlertTriangle, Eye, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { AgentHierarchyModal } from './AgentHierarchyModal';
import { AgentComplaintModal } from './AgentComplaintModal';
import { useIsMobile } from '@/hooks/use-mobile';
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
export const AgentSearchModal = () => {
  const isMobile = useIsMobile();
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const {
    data: agents = [],
    isLoading
  } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('agents').select(`
          *,
          agent_contacts (*)
        `);
      if (error) throw error;
      return data as AgentWithContacts[];
    }
  });
  const filteredAgents = agents.filter(agent => {
    const searchTerm = search.toLowerCase().trim();
    const matchesSearch = searchTerm === '' || agent.name.toLowerCase().includes(searchTerm) || agent.agent_id.toLowerCase().includes(searchTerm) || agent.agent_contacts.some(contact => contact.whatsapp && contact.whatsapp.includes(searchTerm));
    const matchesType = !selectedType || selectedType === 'all' || agent.type === selectedType;
    return matchesSearch && matchesType;
  });
  const handleViewAgent = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsHierarchyModalOpen(true);
  };
  const handleComplaintAgent = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsComplaintModalOpen(true);
  };
  const getUplineAgent = (agent: AgentWithContacts) => {
    if (!agent.reports_to) return null;
    return agents.find(a => a.id === agent.reports_to) || null;
  };
  return <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="gap-2 text-zinc-950 text-sm font-normal bg-lime-600 hover:bg-lime-500">
            <Search className="w-4 h-4" />
            এজেন্ট খুঁজুন
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl p-3 sm:p-6">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-xl">এজেন্ট খুঁজুন</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="নাম ফোন নম্বর বা আইডি দিয়ে খুঁজুন" value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 bg-card border border-primary/10 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary/20" />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-[140px] border-primary/10 h-[42px]">
                <SelectValue placeholder="সব এজেন্ট" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" className="text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md px-3 py-2 my-1 cursor-pointer font-medium">
                  সব এজেন্ট
                </SelectItem>
                <SelectItem value="site_admin" className="text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md px-3 py-2 my-1 cursor-pointer font-medium">
                  সাইট এডমিন
                </SelectItem>
                <SelectItem value="sub_admin" className="text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md px-3 py-2 my-1 cursor-pointer font-medium">
                  সাব এডমিন
                </SelectItem>
                <SelectItem value="super_agent" className="text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md px-3 py-2 my-1 cursor-pointer font-medium">
                  সুপার এজেন্ট
                </SelectItem>
                <SelectItem value="master_agent" className="text-primary hover:bg-primary/10 hover:text-primary transition-all duration-200 rounded-md px-3 py-2 my-1 cursor-pointer font-medium">
                  মাস্টার এজেন্ট
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3 mt-4 max-h-[60vh] sm:max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/10">
            {filteredAgents.map(agent => <div key={agent.id} className="p-3 sm:p-4 rounded-lg bg-card hover:bg-card/80 transition-colors border border-primary/10">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-lg sm:text-xl font-semibold">{agent.name[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-base sm:text-lg truncate">{agent.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary whitespace-nowrap">
                          {agent.agent_id}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">টাইপ:</span>
                          <p className="text-sm text-primary font-medium">
                            {getAgentTypeInBangla(agent.type)}
                          </p>
                        </div>
                        {agent.reports_to && <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">আপলাইন:</span>
                            <span className="text-sm text-primary font-medium">
                              {agents.find(a => a.id === agent.reports_to)?.name || 'N/A'}
                            </span>
                          </div>}
                        {agent.agent_contacts[0]?.whatsapp && <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {agent.agent_contacts[0].whatsapp}
                            </span>
                          </div>}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end sm:flex-col sm:items-end gap-1">
                    <span className="sr-only sm:not-sr-only text-xs text-muted-foreground mb-1">অ্যাকশন</span>
                    <div className="flex items-center gap-2">
                      {agent.agent_contacts[0]?.whatsapp && <a href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-primary/10 transition-colors" aria-label="Send WhatsApp message">
                          <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                        </a>}
                      <Button variant="outline" size="sm" className="gap-2 h-9" onClick={() => handleViewAgent(agent)}>
                        <Eye className="w-4 h-4" />
                        <span className={isMobile ? "sr-only" : ""}>দেখুন</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => handleComplaintAgent(agent)}>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>)}

            {filteredAgents.length === 0 && <div className="text-center py-8 text-muted-foreground text-base">
                কোন এজেন্ট পাওয়া যায়নি
              </div>}
          </div>
        </DialogContent>
      </Dialog>

      <AgentHierarchyModal open={isHierarchyModalOpen} onOpenChange={setIsHierarchyModalOpen} selectedAgent={selectedAgent} agents={agents} />

      <AgentComplaintModal open={isComplaintModalOpen} onOpenChange={setIsComplaintModalOpen} selectedAgent={selectedAgent} uplineAgent={selectedAgent ? getUplineAgent(selectedAgent) : null} />
    </>;
};