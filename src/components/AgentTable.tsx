
import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AgentWithContacts } from '@/types/agent';
import { AlertTriangle, Eye, Edit, Trash2, ArrowUpRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { AgentHierarchyModal } from './AgentHierarchyModal';
import { AgentComplaintModal } from "./AgentComplaintModal";
import { AgentManageModal } from './AgentManageModal';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
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

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
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

export const AgentTable = ({ agents, displayAgents, title, showUpline = true, filterSiteAdmins = true }: AgentTableProps) => {
  const isMobile = useIsMobile();
  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Log session for debugging
        console.log("Current session:", session);

        if (!session?.user) {
          console.log("No user in session");
          setIsAdmin(false);
          return;
        }

        // Get user's email from session
        const userEmail = session.user.email;
        console.log("User email:", userEmail);

        // Find the agent record by matching email with agent_id (which stores email)
        const { data: agentData, error } = await supabase
          .from('agents')
          .select('type')
          .eq('agent_id', userEmail)
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
          return;
        }

        console.log("Agent data:", agentData);

        // Check if the user is either a site_admin or sub_admin
        const isAdminUser = agentData?.type === 'site_admin' || agentData?.type === 'sub_admin';
        setIsAdmin(isAdminUser);
        
        console.log('User type:', agentData?.type);
        console.log('Is admin:', isAdminUser);
      } catch (error) {
        console.error('Error in checkAdminStatus:', error);
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

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

      await queryClient.invalidateQueries({ queryKey: ["all-agents"] });
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

  if (isMobile) {
    return (
      <div className="container px-2 py-2">
        <h1 className="text-xl font-bold text-center text-white mb-3">{title}</h1>
        <div className="space-y-3">
          {agentsToDisplay.map((agent) => (
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
                      <p className="text-xs text-gray-400">{getUplineInfo(agent.reports_to)?.type}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs">যোগাযোগ:</span>
                  {agent.agent_contacts[0]?.whatsapp ? (
                    <div className="flex items-center gap-1">
                      <WhatsAppIcon />
                      <a
                        href={`https://wa.me/${agent.agent_contacts[0].whatsapp}`}
                        className="text-emerald-400 hover:text-emerald-300 transition-colors text-xs"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {agent.agent_contacts[0].whatsapp}
                      </a>
                    </div>
                  ) : (
                    <span className="text-gray-500 text-xs">No contact</span>
                  )}
                </div>
                
                <div className="flex justify-end gap-1.5 mt-2">
                  <button 
                    className="p-1.5 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsHierarchyModalOpen(true);
                    }}
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs text-emerald-400">দেখুন</span>
                  </button>
                  {isAdmin && (
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
                        onClick={() => {
                          setSelectedAgent(agent);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-400" />
                        <span className="text-xs text-red-400">ডিলিট</span>
                      </button>
                    </>
                  )}
                  <button 
                    className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1"
                    onClick={() => {
                      setSelectedAgent(agent);
                      setIsComplaintModalOpen(true);
                    }}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-xs text-red-400">অভিযোগ</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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
          uplineAgent={selectedAgent ? getUplineInfo(selectedAgent.reports_to) : null}
        />
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>আপনি কি নিশ্চিত?</AlertDialogTitle>
              <AlertDialogDescription>
                ��ই এজেন্টের সমস্ত তথ্য স্থায়ীভাবে মুছে ফেলা হবে। এই ক্রিয়াটি আর ফিরিয়ে নেওয়া যাবে না।
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>বাতিল</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>ডিলিট করুন</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
  }

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
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="w-4 h-4 text-blue-400" />
                        <div>
                          <p className="text-blue-400">
                            {getUplineInfo(agent.reports_to)?.name}
                          </p>
                          <p className="text-sm text-gray-400">
                            {getAgentTypeInBangla(getUplineInfo(agent.reports_to)?.type || '')}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-500">কোন আপলাইন নেই</span>
                    )}
                  </TableCell>
                )}
                <TableCell>
                  {agent.agent_contacts[0]?.whatsapp ? (
                    <div className="flex items-center gap-2">
                      <WhatsAppIcon />
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
                      size="sm"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsHierarchyModalOpen(true);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <Eye className="h-4 w-4" />
                      <span>দেখুন</span>
                    </Button>
                    {isAdmin && (
                      <>
                        <AgentManageModal
                          mode="edit"
                          agent={agent}
                          trigger={
                            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                              <Edit className="h-4 w-4" />
                              <span>এডিট</span>
                            </Button>
                          }
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedAgent(agent);
                            setIsDeleteDialogOpen(true);
                          }}
                          className="flex items-center gap-1.5"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>ডিলিট</span>
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedAgent(agent);
                        setIsComplaintModalOpen(true);
                      }}
                      className="flex items-center gap-1.5"
                    >
                      <AlertTriangle className="h-4 w-4" />
                      <span>অভিযোগ</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

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
        uplineAgent={selectedAgent ? getUplineInfo(selectedAgent.reports_to) : null}
      />
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
    </div>
  );
};
