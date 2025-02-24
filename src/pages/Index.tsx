import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomerSupport } from "@/components/CustomerSupport";
import { AgentCard } from "@/components/AgentCard";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";
import { AlertTriangle, Eye, ExternalLink, Globe, Info, MessageSquare, Phone, Shield, Users, Link } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { AgentHierarchyModal } from "@/components/AgentHierarchyModal";
import { AgentComplaintModal } from "@/components/AgentComplaintModal";
import { NoticeListCarousel } from '@/components/NoticeListCarousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useIsMobile } from "@/hooks/use-mobile";
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
const formatPhoneNumber = (phone: string) => {
  return phone.replace(/(\d{5})(\d{6})/, '$1 $2');
};
const heroImages = ["/placeholder.svg", "/og-image.png", "/favicon.ico"];
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
  const isMobile = useIsMobile();
  const handleViewHierarchy = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsHierarchyModalOpen(true);
  };
  const handleComplaint = (agent: AgentWithContacts) => {
    setSelectedAgent(agent);
    setIsComplaintModalOpen(true);
  };
  const masterAgents = allAgents?.filter(agent => agent.type === 'master_agent').slice(0, 5);
  const plugin = React.useRef(Autoplay({
    delay: 4000,
    stopOnInteraction: false
  }));
  return <div className="min-h-screen bg-gradient-to-br from-background via-background/90 to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[280px] md:h-[320px] overflow-hidden">
        <Carousel opts={{
        align: "start",
        loop: true
      }} plugins={[plugin.current]} className="w-full h-full">
          <CarouselContent>
            {heroImages.map((image, index) => <CarouselItem key={index} className="w-full h-[280px] md:h-[320px] relative">
                <div className="w-full h-full bg-cover bg-center" style={{
              backgroundImage: `url(${image})`
            }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-background/90">
                    <div className="container h-full flex items-center justify-center px-4">
                      <div className="text-center space-y-3">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                          Skyex OFFICIAL WEBSITE
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                          Your trusted platform for gaming and entertainment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious className="left-2 md:left-4 h-8 w-8 md:h-10 md:w-10" />
          <CarouselNext className="right-2 md:right-4 h-8 w-8 md:h-10 md:w-10" />
        </Carousel>
      </section>

      {/* Notice Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y border-primary/20">
        <div className="container py-3 px-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 shrink-0">
              <Info className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary font-medium">নোটিশ:</span>
            </div>
            <div className="flex-1">
              <NoticeListCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Master Agents List */}
      <section className="container py-6 md:py-12 px-4">
        <div className="glass-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 md:w-5 md:h-5" />
            কুইক মাস্টার এজেন্ট লিস্ট
          </h2>
          {isLoading ? <div>Loading agents...</div> : <div className="space-y-3 md:space-y-4">
              {masterAgents?.map(agent => <div key={agent.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg gap-3 md:gap-4">
                  <div className="flex items-center gap-3">
                    <div className="agent-avatar text-base md:text-lg">{agent.name[0]}</div>
                    <div>
                      <p className="font-medium text-sm md:text-base">{agent.name}</p>
                      <p className="px-2 py-0.5 bg-emerald-500/20 rounded text-emerald-400 font-medium text-xs md:text-sm inline-block">
                        {agent.agent_id}
                      </p>
                      {agent.agent_contacts[0]?.whatsapp && <div className="flex items-center gap-2 mt-1">
                          <WhatsAppIcon className="w-4 h-4" />
                          <span className="text-xs md:text-sm">{formatPhoneNumber(agent.agent_contacts[0].whatsapp)}</span>
                        </div>}
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-center">
                    <button className="p-2 hover:bg-emerald-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap text-xs md:text-sm" onClick={() => handleViewHierarchy(agent)}>
                      <Eye className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
                      <span className="text-emerald-400">দেখুন</span>
                    </button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap text-xs md:text-sm" onClick={() => handleComplaint(agent)}>
                      <AlertTriangle className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                      <span className="text-red-400">অভিযোগ</span>
                    </button>
                  </div>
                </div>)}
            </div>}
        </div>
      </section>

      {/* Proxy Links Section */}
      <section className="container py-6 md:py-12 px-4">
        <div className="glass-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Link className="w-4 h-4 md:w-5 md:h-5" />
            স্কাইএক্স প্রক্সি লিঙ্ক
          </h2>
          <div className="space-y-3 md:space-y-4">
            <div className="p-3 md:p-4 bg-secondary/50 rounded-lg">
              <p className="text-base md:text-lg mb-2">স্কাইএক্স সাইটের প্রক্সী লিঙ্কঃ</p>
              <div className="space-y-2">
                <a href="http://skyex247.live" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  http://skyex247.live
                </a>
                <a href="http://skyexspin24.live" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-primary hover:underline text-sm md:text-base">
                  <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                  http://skyexspin24.live
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Official Links */}
      <section className="container py-6 md:py-12 px-4">
        <div className="glass-card p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-4 h-4 md:w-5 md:h-5" />
            Official Links
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <a href="#" className="flex items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg hover:bg-primary/20 transition-colors">
              <span className="text-sm md:text-base">Main Website</span>
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="#" className="flex items-center justify-between p-3 md:p-4 bg-secondary/50 rounded-lg hover:bg-primary/20 transition-colors">
              <span className="text-sm md:text-base">Live Portal</span>
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Agent Types */}
      <section className="container py-6 md:py-12 px-4">
        <div className="bg-[#0F1A2A] rounded-lg p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">
            <span className="text-white">এজেন্ট কয়</span>{" "}
            <span className="text-emerald-400">প্রকার</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-[#0A1321] rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-emerald-400 text-center">
                অনলাইন সুপার এজেন্ট
              </h3>
              <div className="bg-[#162133] rounded p-3 md:p-4">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">সুপার এজেন্টরা ইউজার একাউন্ট এবং মা্টার এজেন্ট একাউন্ট খুলেতে পারেন। কোন সুপার এজেন্টের নামে অভিযোগ থাকলে সরাসরি এডমিনকে জানাতে হবে উপরে মেনুতে এডমিন লিস্ট দেওয়া আছে।</p>
              </div>
            </div>
            <div className="bg-[#0A1321] rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-emerald-400 text-center">
                অনলাইন মাস্টার এজেন্ট
              </h3>
              <div className="bg-[#162133] rounded p-3 md:p-4">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  অনলাইন মাস্টার এজেন্টরা শুধু ইউজার একাউন্ট খুলে দিতে পারেন। কোন মাস্টার এজেন্টের নামে অভিযোগ থাকলে সরাসরি সুপার এজেন্টের কাছে অভিযোগ করতে হবে{" "}
                  <a href="/super-agent" className="text-emerald-400 hover:underline">
                    বিস্তারিত জানতে এই লিংকে ক্লিক করুন
                  </a>।
                </p>
              </div>
            </div>
            <div className="bg-[#0A1321] rounded-lg p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-emerald-400 text-center">
                লোকাল মাস্টার এজেন্ট
              </h3>
              <div className="bg-[#162133] rounded p-3 md:p-4">
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  লোকাল মাস্টার এজেন্টরা শুধু ইউজার একাউন্ট খুলে দিতে পারেন। কোন লোকাল মাস্টার এজেন্টের নামে অভিযোগ থাকলে সরাসরি অনলাইন মাস্টার এজেন্টের কাছে অভিযোগ করতে হবে{" "}
                  <a href="/master-agent" className="text-emerald-400 hover:underline">
                    বিস্তারিত জানতে এই লিংকে ক্লিক করুন
                  </a>।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Agent List Instructions */}
      <section className="container py-6 md:py-12 px-4">
        <div className="bg-[#0F1A2A] rounded-lg p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">
            <span className="text-white">এজেন্ট</span>{" "}
            <span className="text-emerald-400">লিস্ট</span>
          </h2>
          <div className="bg-[#162133] rounded-lg p-4 md:p-6 space-y-4">
            <div className="flex items-start gap-3">
              <WhatsAppIcon className="w-4 h-4 md:w-5 md:h-5 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                অ্যাকাউন্ট খুলতে নিম্নের অনলাইন এজেন্ট লিস্ট এ ক্লিক করুন। এজেন্ট লিস্ট এর এজেন্ট দের সাথে ইউজার দের শুধুমাত্র হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করতে হবে।
              </p>
            </div>
            
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                হোয়াটসঅ্যাপ ছাড়া অন্য কোন মাধ্যমে যোগাযোগ করলে তা গ্রহণযোগ্য হবে না।
              </p>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                হোয়াটসঅ্যাপে যোগাযোগ করতে হলে এজেন্ট লিস্টে হোয়াটসঅ্যাপ আইকন উপরে ক্লিক করুন অথবা ফোন নাম্বারটা মোবাইলে সেভ করে তাকে হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারবেন।
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                হোয়াটসঅ্যাপ অ্যাপটি আপনার মোবাইলে আগে থেকেই থাকতে হবে না থাকলে গুগল প্লে থেকে ইন্সটল করে নিন।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <AgentHierarchyModal open={isHierarchyModalOpen} onOpenChange={setIsHierarchyModalOpen} selectedAgent={selectedAgent} agents={allAgents || []} />
      <AgentComplaintModal open={isComplaintModalOpen} onOpenChange={setIsComplaintModalOpen} selectedAgent={selectedAgent} uplineAgent={null} />
      <CustomerSupport />
    </div>;
};
export default Index;