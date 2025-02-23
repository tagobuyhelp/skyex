
import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye } from 'lucide-react';
import { AgentWithContacts } from '@/types/agent';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { AgentManageModal } from './AgentManageModal';
import { AgentHierarchyModal } from './AgentHierarchyModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AgentTableProps {
  agents: AgentWithContacts[];
  displayAgents?: AgentWithContacts[];
  title: string;
  showUpline?: boolean;
  filterSiteAdmins?: boolean;
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

export const AgentTable = ({ agents, displayAgents, title, showUpline = true, filterSiteAdmins = true }: AgentTableProps) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const currentPageType = title.includes('সুপার') ? 'super_agent' 
    : title.includes('মাস্টার') ? 'master_agent'
    : title.includes('এডমিন') ? 'site_admin'
    : title.includes('সাব') ? 'sub_admin'
    : null;
  
  const agentsToDisplay = displayAgents || (currentPageType
    ? agents.filter(agent => agent.type === currentPageType)
    : filterSiteAdmins 
      ? agents.filter(agent => agent.type !== 'site_admin')
      : agents);
  
  const getUplineInfo = (uplineId: string | null) => {
    if (!uplineId) return null;
    return agents.find(agent => agent.id === uplineId);
  };

  const handleDelete = async () => {
    if (!selectedAgent) return;

    try {
      const { error: contactsError } = await supabase
        .from('agent_contacts')
        .delete()
        .eq('agent_id', selectedAgent.id);

      if (contactsError) throw contactsError;

      const { error: agentError } = await supabase
        .from('agents')
        .delete()
        .eq('id', selectedAgent.id);

      if (agentError) throw agentError;

      toast({
        title: "এজেন্ট ডিলিট করা হয়েছে",
        description: "এজেন্টের সমস্ত তথ্য মুছে ফেলা হয়েছে।",
      });

      // Invalidate and refetch queries
      await queryClient.invalidateQueries({ queryKey: ["all-agents-dashboard"] });
      await queryClient.invalidateQueries({ queryKey: ["site-admins-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["sub-admins-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["super-agents-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["master-agents-with-hierarchy"] });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "একটি সমস্যা হয়েছে",
        description: error.message,
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedAgent(null);
    }
  };

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold text-center text-white mb-8">{title}</h1>
      <div className="glass-card">
        <Table>
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
            {agentsToDisplay.map((agent) => (
              <TableRow key={agent.id} className="border-b border-white/10">
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
                  <span className="px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-400 font-medium">
                    {agent.agent_id}
                  </span>
                </TableCell>
                {showUpline && (
                  <TableCell>
                    {agent.reports_to ? (
                      <div>
                        <p className="text-blue-400">{getUplineInfo(agent.reports_to)?.name}</p>
                        <p className="text-sm text-gray-400">
                          {getAgentTypeInBangla(getUplineInfo(agent.reports_to)?.type || '')}
                        </p>
                      </div>
                    ) : (
                      <span className="text-gray-500">কোন আপলাইন নেই</span>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  {agent.agent_contacts[0]?.whatsapp ? (
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {agent.agent_contacts[0].whatsapp}
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500">যোগাযোগের তথ্য নেই</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsHierarchyModalOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <AgentManageModal
                      mode="edit"
                      agent={agent}
                      trigger={
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      }
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
            <AlertDialogDescription>
              এই এজেন্টের সমস্ত তথ্য স্থায়ীভাবে মুছে ফেলা হবে। এই ক্রিয়াটি আর ফিরিয়ে নেওয়া যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>ডিলিট করুন</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AgentHierarchyModal
        open={isHierarchyModalOpen}
        onOpenChange={setIsHierarchyModalOpen}
        selectedAgent={selectedAgent}
        agents={agents}
      />
    </div>
  );
};
