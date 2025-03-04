
import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomerSupport } from "@/components/CustomerSupport";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { useState } from "react";
import { AgentHierarchyModal } from "@/components/AgentHierarchyModal";
import { AgentComplaintModal } from "@/components/AgentComplaintModal";

// Import the new component sections
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
  const {
    data: allAgents,
    isLoading
  } = useQuery({
    queryKey: ["all-agents"],
    queryFn: fetchAllAgents
  });

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Notice Section */}
      <NoticeSection />

      {/* Quick Master Agents List */}
      <MasterAgentSection 
        masterAgents={masterAgents} 
        isLoading={isLoading} 
        onViewHierarchy={handleViewHierarchy} 
        onComplaint={handleComplaint}
      />

      {/* Proxy Links Section */}
      <ProxyLinksSection />

      {/* Official Links */}
      <OfficialLinksSection />

      {/* Agent Types */}
      <AgentTypesSection />

      {/* Agent List Instructions */}
      <AgentListInstructionsSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
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
