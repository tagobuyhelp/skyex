
import { useState } from 'react';
import { Search, AlertTriangle, Eye, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { AgentWithContacts } from '@/types/agent';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { AgentHierarchyModal } from './AgentHierarchyModal';
import { AgentComplaintModal } from './AgentComplaintModal';

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
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const { data: agents = [], isLoading } = useQuery({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select(`
          *,
          agent_contacts (*)
        `);

      if (error) throw error;
      return data as AgentWithContacts[];
    },
  });

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = search.toLowerCase() === '' || 
      agent.name.toLowerCase().includes(search.toLowerCase()) ||
      agent.agent_id.toLowerCase().includes(search.toLowerCase()) ||
      (agent.agent_contacts[0]?.whatsapp || '').includes(search.toLowerCase());
    
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

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="gap-2 text-sm hover:bg-primary/20"
          >
            <Search className="w-4 h-4" />
            এজেন্ট খুঁজুন
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-lg">এজেন্ট খুঁজুন</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="নাম ফোন নম্বর, বা আইডি দিয়ে খুঁজুন"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-card border border-primary/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
            <Select
              value={selectedType}
              onValueChange={setSelectedType}
            >
              <SelectTrigger className="w-full sm:w-[140px] bg-[#F2FCE2] border-primary/10">
                <SelectValue placeholder="সব.এজেন্ট" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব এজেন্ট</SelectItem>
                <SelectItem value="site_admin">সাইট এডমিন</SelectItem>
                <SelectItem value="sub_admin">সাব এডমিন</SelectItem>
                <SelectItem value="super_agent">সুপার এজেন্ট</SelectItem>
                <SelectItem value="master_agent">মাস্টার এজেন্ট</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mt-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/10">
            {filteredAgents.map((agent) => (
              <div 
                key={agent.id}
                className="p-4 rounded-lg bg-card hover:bg-card/80 transition-colors border border-primary/10"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-xl font-semibold">{agent.name[0].toUpperCase()}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{agent.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary whitespace-nowrap">
                          {agent.agent_id}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">টাইপ:</span>
                          <p className="text-sm text-primary font-medium">
                            {getAgentTypeInBangla(agent.type)}
                          </p>
                        </div>
                        {agent.reports_to && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">আপলাইন:</span>
                            <span className="text-sm text-primary font-medium">
                              {agents.find(a => a.id === agent.reports_to)?.name || 'N/A'}
                            </span>
                          </div>
                        )}
                        {agent.agent_contacts[0]?.whatsapp && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {agent.agent_contacts[0].whatsapp}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end sm:flex-col sm:items-end gap-1">
                    <span className="sr-only sm:not-sr-only text-xs text-muted-foreground mb-1">অ্যাকশন</span>
                    <div className="flex items-center gap-2">
                      {agent.agent_contacts[0]?.whatsapp && (
                        <a
                          href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-primary/10 transition-colors"
                          aria-label="Send WhatsApp message"
                        >
                          <WhatsAppIcon className="w-4 h-4 text-emerald-500" />
                        </a>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2"
                        onClick={() => handleViewAgent(agent)}
                      >
                        <Eye className="w-4 h-4" />
                        দেখুন
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => handleComplaintAgent(agent)}
                      >
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredAgents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                কোন এজেন্ট পাওয়া যায়নি
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <AgentHierarchyModal
        open={isHierarchyModalOpen}
        onOpenChange={setIsHierarchyModalOpen}
        selectedAgent={selectedAgent}
        agents={agents}
      />

      <AgentComplaintModal
        open={isComplaintModalOpen}
        onOpenChange={setIsComplaintModalOpen}
        selectedAgent={selectedAgent}
        uplineAgent={selectedAgent ? getUplineAgent(selectedAgent) : null}
      />
    </>
  );
};
