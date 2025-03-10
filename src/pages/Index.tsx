
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomerSupport } from "@/components/CustomerSupport";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { useState, useEffect } from "react";
import { AgentHierarchyModal } from "@/components/AgentHierarchyModal";
import { AgentComplaintModal } from "@/components/AgentComplaintModal";
import { useLoading } from "@/components/LoadingProvider";

import { HeroSection } from "@/components/sections/HeroSection";
import { NoticeSection } from "@/components/sections/NoticeSection";
import { MasterAgentSection } from "@/components/sections/MasterAgentSection";
import { ProxyLinksSection } from "@/components/sections/ProxyLinksSection";
import { OfficialLinksSection } from "@/components/sections/OfficialLinksSection";
import { AgentTypesSection } from "@/components/sections/AgentTypesSection";
import { AgentListInstructionsSection } from "@/components/sections/AgentListInstructionsSection";

const fetchAllAgents = async () => {
  const {
    data: agents,
    error
  } = await supabase.from("agents").select(`
      *,
      agent_contacts (*)
    `).order('created_at', {
    ascending: false
  });
  if (error) throw error;
  return agents as AgentWithContacts[];
};

const Index = () => {
  const { startLoading, stopLoading } = useLoading();
  
  const {
    data: allAgents,
    isLoading
  } = useQuery({
    queryKey: ["all-agents"],
    queryFn: fetchAllAgents
  });

  useEffect(() => {
    if (isLoading) {
      startLoading("Fetching agent data...");
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  const [selectedAgent, setSelectedAgent] = useState<AgentWithContacts | null>(null);
  const [isHierarchyModalOpen, setIsHierarchyModalOpen] = useState(false);
  const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

  const handleViewHierarchy = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsHierarchyModalOpen(true);
  };

  const handleComplaint = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsComplaintModalOpen(true);
  };

  const masterAgents = allAgents?.filter(agent => agent.type === 'master_agent').slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <Header />
      
      <HeroSection />

      <NoticeSection />

      <MasterAgentSection 
        masterAgents={masterAgents} 
        isLoading={false}
        onViewHierarchy={handleViewHierarchy} 
        onComplaint={handleComplaint}
      />

      <ProxyLinksSection />

      <OfficialLinksSection />

      <AgentTypesSection />

      <AgentListInstructionsSection />

      <Footer />

      <AgentHierarchyModal 
        open={isHierarchyModalOpen} 
        onOpenChange={setIsHierarchyModalOpen} 
        selectedAgent={selectedAgent} 
        agents={allAgents || []} 
      />
      <AgentComplaintModal 
        open={isComplaintModalOpen} 
        onOpenChange={setIsComplaintModalOpen} 
        selectedAgent={selectedAgent} 
        uplineAgent={null} 
      />
      <CustomerSupport />
    </div>
  );
};

export default Index;
