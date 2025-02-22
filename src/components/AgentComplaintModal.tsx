
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
        bg-gray-900
        border-gray-800
      `}>
        <DialogHeader>
          <DialogTitle className="text-xl text-emerald-400">এজেন্ট রিপোর্ট করুন</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Agent Info */}
          <div className="space-y-4">
            <h3 className="text-gray-400 text-sm">এজেন্টের তথ্য</h3>
            <div className="bg-gray-800/50 p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                  {selectedAgent.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-white">{selectedAgent.name}</p>
                  <p className="text-sm text-gray-400">{selectedAgent.agent_id}</p>
                  {selectedAgent.agent_contacts[0]?.whatsapp && (
                    <a
                      href={`https://wa.me/${selectedAgent.agent_contacts[0].whatsapp}`}
                      className="inline-flex items-center gap-1.5 text-sm text-emerald-400 mt-1 hover:text-emerald-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Upline Agent Info */}
          {uplineAgent && (
            <div className="space-y-4">
              <h3 className="text-gray-400 text-sm">এজেন্টের আপলাইন</h3>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium">
                    {uplineAgent.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-white">{uplineAgent.name}</p>
                    <p className="text-sm text-gray-400">{uplineAgent.agent_id}</p>
                    {uplineAgent.agent_contacts[0]?.whatsapp && (
                      <a
                        href={`https://wa.me/${uplineAgent.agent_contacts[0].whatsapp}`}
                        className="inline-flex items-center gap-1.5 text-sm text-emerald-400 mt-1 hover:text-emerald-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppIcon />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Complaint Form */}
          <div className="space-y-4">
            <div>
              <label htmlFor="whatsapp" className="block text-sm text-gray-400 mb-2">
                আপনার WhatsApp নম্বর
              </label>
              <input
                id="whatsapp"
                type="text"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500"
                placeholder="কান্ট্রি কোড সহ লিখুন (যেমন: +8801234567890)"
              />
            </div>

            <div>
              <label htmlFor="complaint" className="block text-sm text-gray-400 mb-2">
                রিপোর্টের কারণ
              </label>
              <textarea
                id="complaint"
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 resize-none"
                placeholder="রিপোর্টের কারণ বিস্তারিত লিখুন..."
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
            >
              বাতিল করুন
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              রিপোর্ট করুন
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
