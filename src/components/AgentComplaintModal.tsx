
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Check, Flag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AgentComplaintModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAgent: AgentWithContacts | null;
  uplineAgent: AgentWithContacts | null;
}

export const AgentComplaintModal = ({
  open,
  onOpenChange,
  selectedAgent,
  uplineAgent
}: AgentComplaintModalProps) => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [complaintType, setComplaintType] = useState<'selected' | 'upline' | 'site_admin'>('selected');
  const [whatsapp, setWhatsapp] = useState('');
  const [complaint, setComplaint] = useState('');
  const [siteAdmins, setSiteAdmins] = useState<AgentWithContacts[]>([]);
  const [selectedSiteAdmin, setSelectedSiteAdmin] = useState<AgentWithContacts | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      // Reset form on open
      setWhatsapp('');
      setComplaint('');
      setComplaintType('selected');
      setSelectedSiteAdmin(null);
      
      // Fetch site admins
      const fetchSiteAdmins = async () => {
        try {
          const { data, error } = await supabase
            .from('agents')
            .select(`
              *,
              agent_contacts (*)
            `)
            .eq('type', 'site_admin');
            
          if (error) throw error;
          setSiteAdmins(data as AgentWithContacts[]);
          if (data.length > 0) {
            setSelectedSiteAdmin(data[0] as AgentWithContacts);
          }
        } catch (error: any) {
          console.error("Error fetching site admins:", error.message);
        }
      };
      
      fetchSiteAdmins();
    }
  }, [open]);

  const handleSubmit = async () => {
    // Validate form
    if (!whatsapp) {
      toast({
        variant: "destructive",
        title: "বার্তা পাঠানো ব্যর্থ হয়েছে",
        description: "আপনার WhatsApp নম্বর লিখুন",
      });
      return;
    }

    if (!complaint) {
      toast({
        variant: "destructive",
        title: "বার্তা পাঠানো ব্যর্থ হয়েছে",
        description: "অভিযোগের কারণ লিখুন",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you would send this to your backend
      // For now, we'll just simulate a submission
      
      // Determine which agent the complaint is about
      let complaintAgentInfo;
      
      if (complaintType === 'selected' && selectedAgent) {
        complaintAgentInfo = `${selectedAgent.name} (${selectedAgent.agent_id})`;
      } else if (complaintType === 'upline' && uplineAgent) {
        complaintAgentInfo = `${uplineAgent.name} (${uplineAgent.agent_id})`;
      } else if (complaintType === 'site_admin' && selectedSiteAdmin) {
        complaintAgentInfo = `${selectedSiteAdmin.name} (${selectedSiteAdmin.agent_id})`;
      } else {
        throw new Error("No agent selected for complaint");
      }
      
      // Here you would typically save this to your database
      console.log("Complaint submitted:", {
        agent: complaintAgentInfo,
        whatsapp,
        complaint
      });
      
      // Show success message
      toast({
        title: "অভিযোগ জমা দেওয়া হয়েছে",
        description: "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।",
      });
      
      // Close modal
      onOpenChange(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "বার্তা পাঠানো ব্যর্থ হয়েছে",
        description: error.message || "একটি সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!selectedAgent) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`
        max-w-md 
        ${isMobile ? 'p-4' : 'p-6'}
        bg-gradient-to-br from-[#1A1704] to-[#261F06]
        border-primary/20
      `}>
        <DialogHeader>
          <DialogTitle className="text-base sm:text-lg font-medium text-amber-500">এজেন্ট রিপোর্ট করুন</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Complaint Type Selection */}
          <div className="space-y-3">
            <h3 className="text-xs sm:text-sm text-gray-400">কাকে রিপোর্ট করতে চান?</h3>
            <div className="grid grid-cols-3 gap-2">
              <button 
                className={`px-2 py-1.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 ${
                  complaintType === 'selected' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700'
                }`}
                onClick={() => setComplaintType('selected')}
              >
                <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                এই এজেন্ট
              </button>
              
              <button 
                className={`px-2 py-1.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 ${
                  complaintType === 'upline' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700'
                }`}
                onClick={() => setComplaintType('upline')}
                disabled={!uplineAgent}
              >
                <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                আপলাইন
              </button>
              
              <button 
                className={`px-2 py-1.5 rounded-lg text-xs sm:text-sm flex items-center justify-center gap-1.5 ${
                  complaintType === 'site_admin' 
                    ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40' 
                    : 'bg-gray-800/50 text-gray-400 border border-gray-700'
                }`}
                onClick={() => setComplaintType('site_admin')}
              >
                <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
                সাইট এডমিন
              </button>
            </div>
          </div>

          {/* Selected Agent/Admin Info */}
          {complaintType === 'selected' && (
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm text-gray-400">এজেন্টের তথ্য</h3>
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium text-sm sm:text-base">
                    {selectedAgent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-white">{selectedAgent.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{selectedAgent.agent_id}</p>
                    {selectedAgent.agent_contacts[0]?.whatsapp && <a href={`https://wa.me/${selectedAgent.agent_contacts[0].whatsapp}`} className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 mt-1 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        WhatsApp
                      </a>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Upline Agent Info */}
          {complaintType === 'upline' && uplineAgent && (
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm text-gray-400">আপলাইন এজেন্টের তথ্য</h3>
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm sm:text-base">
                    {uplineAgent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-white">{uplineAgent.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{uplineAgent.agent_id}</p>
                    {uplineAgent.agent_contacts[0]?.whatsapp && <a href={`https://wa.me/${uplineAgent.agent_contacts[0].whatsapp}`} className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 mt-1 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">
                        <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        WhatsApp
                      </a>}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Site Admin Selection */}
          {complaintType === 'site_admin' && (
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm text-gray-400">সাইট এডমিন নির্বাচন করুন</h3>
              {siteAdmins.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 gap-2 max-h-[120px] overflow-y-auto">
                    {siteAdmins.map(admin => (
                      <button 
                        key={admin.id}
                        className={`text-left p-3 rounded-lg flex items-center gap-3 ${
                          selectedSiteAdmin?.id === admin.id
                            ? 'bg-amber-500/20 border border-amber-500/40'
                            : 'bg-gray-800/50 border border-gray-700'
                        }`}
                        onClick={() => setSelectedSiteAdmin(admin)}
                      >
                        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium text-sm">
                          {admin.name[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-white">{admin.name}</p>
                          <p className="text-xs text-gray-400">{admin.agent_id}</p>
                        </div>
                        {selectedSiteAdmin?.id === admin.id && (
                          <Check className="w-4 h-4 text-amber-500 ml-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                  
                  {selectedSiteAdmin && (
                    <div className="mt-2">
                      {selectedSiteAdmin.agent_contacts[0]?.whatsapp && (
                        <a 
                          href={`https://wa.me/${selectedSiteAdmin.agent_contacts[0].whatsapp}`} 
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          {selectedSiteAdmin.agent_contacts[0].whatsapp}
                        </a>
                      )}
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-800/50 p-3 rounded-lg text-center text-sm text-gray-400">
                  কোন সাইট এডমিন পাওয়া যায়নি
                </div>
              )}
            </div>
          )}

          {/* Complaint Form */}
          <div className="space-y-3">
            <div>
              <label htmlFor="whatsapp" className="block text-xs sm:text-sm text-gray-400 mb-1.5">
                আপনার WhatsApp নম্বর
              </label>
              <input 
                id="whatsapp" 
                type="text" 
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-xs sm:text-sm text-white placeholder-gray-500" 
                placeholder="কান্ট্রি কোড সহ লিখুন (যেমন: +8801234567890)" 
              />
            </div>

            <div>
              <label htmlFor="complaint" className="block text-xs sm:text-sm text-gray-400 mb-1.5">
                রিপোর্টের কারণ
              </label>
              <textarea 
                id="complaint" 
                rows={4} 
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2.5 text-xs sm:text-sm text-white placeholder-gray-500 resize-none" 
                placeholder="রিপোর্টের কারণ বিস্তারিত লিখুন..." 
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button 
              onClick={() => onOpenChange(false)} 
              className="px-3 py-1.5 rounded-lg bg-gray-800 text-xs sm:text-sm text-gray-300 hover:bg-gray-700 transition-colors"
              disabled={isSubmitting}
            >
              বাতিল করুন
            </button>
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-3 py-1.5 rounded-lg bg-red-500 text-xs sm:text-sm text-white hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              {isSubmitting ? 'পাঠানো হচ্ছে...' : 'রিপোর্ট করুন'}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
