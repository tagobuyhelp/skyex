
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AgentWithContacts } from "@/types/agent";
import { useIsMobile } from "@/hooks/use-mobile";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
  uplineAgent,
}: AgentComplaintModalProps) => {
  const isMobile = useIsMobile();

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
          <DialogTitle className="text-base sm:text-lg text-emerald-400 font-medium">এজেন্ট রিপোর্ট করুন</DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Agent Info */}
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
                  {selectedAgent.agent_contacts[0]?.whatsapp && (
                    <a
                      href={`https://wa.me/${selectedAgent.agent_contacts[0].whatsapp}`}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 mt-1 hover:text-emerald-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Upline Agent Info */}
          {uplineAgent && (
            <div className="space-y-3">
              <h3 className="text-xs sm:text-sm text-gray-400">এজেন্টের আপলাইন</h3>
              <div className="bg-gray-800/50 p-3 sm:p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-sm sm:text-base">
                    {uplineAgent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-sm sm:text-base text-white">{uplineAgent.name}</p>
                    <p className="text-xs sm:text-sm text-gray-400">{uplineAgent.agent_id}</p>
                    {uplineAgent.agent_contacts[0]?.whatsapp && (
                      <a
                        href={`https://wa.me/${uplineAgent.agent_contacts[0].whatsapp}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-emerald-400 mt-1 hover:text-emerald-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
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
            >
              বাতিল করুন
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-red-500 text-xs sm:text-sm text-white hover:bg-red-600 transition-colors"
            >
              রিপোর্ট করুন
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
