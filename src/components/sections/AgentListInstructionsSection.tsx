
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { AlertTriangle, MessageSquare, Phone } from "lucide-react";

export const AgentListInstructionsSection = () => {
  return (
    <section className="container py-6 md:py-12 px-4">
      <div className="bg-[#261F06]/80 backdrop-blur-md rounded-lg p-4 md:p-8 border border-primary/20">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">
          <span className="text-white">এজেন্ট</span>{" "}
          <span className="text-primary">লিস্ট</span>
        </h2>
        <div className="bg-[#1A1704] rounded-lg p-4 md:p-6 space-y-4 border border-primary/10">
          <div className="flex items-start gap-3">
            <WhatsAppIcon className="w-5 h-5 md:w-6 md:h-6 shrink-0 mt-0.5 text-primary" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              একাউন্ট খুলতে নিম্নের অনলাইন এজেন্ট লিস্ট এ ক্লিক করুন। এজেন্ট লিস্ট এর এজেন্ট দের সাথে ইউজার দের শুধুমাত্র হোয়াটসঅ্যাপের মাধ্যমে যোগাযোগ করতে হবে।
            </p>
          </div>
          
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-red-400 shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              হোয়াটসঅ্যাপ ছাড়া অন্য কোন মাধ্যমে যোগাযোগ করলে তা গ্রহণযোগ্য হবে না।
            </p>
          </div>

          <div className="flex items-start gap-3">
            <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              হোয়াটসঅ্যাপে যোগাযোগ করতে হলে এজেন্ট লিস্টে হোয়াটসঅ্যাপ আইকন উপরে ক্লিক করুন অথবা ফোন নাম্বারটা মোবাইলে সেভ করে তাকে হোয়াটসঅ্যাপে মেসেজ পাঠাতে পারবেন।
            </p>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 md:w-6 md:h-6 text-primary shrink-0 mt-0.5" />
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              হোয়াটসঅ্যাপ অ্যাপটি আপনার মোবাইলে আগে থেকেই থাকতে হবে না থাকলে গুগল প্লে থেকে ইন্সটল করে নিন।
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
