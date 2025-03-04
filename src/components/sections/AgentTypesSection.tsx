
export const AgentTypesSection = () => {
  return (
    <section className="container py-6 md:py-12 px-4">
      <div className="bg-[#261F06]/80 backdrop-blur-md rounded-lg p-4 md:p-8 border border-primary/20">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center">
          <span className="text-white">এজেন্ট কয়</span>{" "}
          <span className="text-primary">প্রকার</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-[#1A1704] rounded-lg p-4 md:p-6 border border-primary/10">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary text-center">
              অনলাইন সুপার এজেন্ট
            </h3>
            <div className="bg-[#2A2410] rounded p-3 md:p-4">
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">সুপার এজেন্টরা ইউজার একাউন্ট এবং মা্টার এজেন্ট একাউন্ট খুলেতে পারেন। কোন সুপার এজেন্টের নামে অভিযোগ থাকলে সরাসরি এডমিনকে জানাতে হবে উপরে মেনুতে এডমিন লিস্ট দেওয়া আছে।</p>
            </div>
          </div>
          <div className="bg-[#1A1704] rounded-lg p-4 md:p-6 border border-primary/10">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary text-center">
              অনলাইন মাস্টার এজেন্ট
            </h3>
            <div className="bg-[#2A2410] rounded p-3 md:p-4">
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                অনলাইন মাস্টার এজেন্টরা শুধু ইউজার একাউন্ট খুলে দিতে পারেন। কোন মাস্টার এজেন্টের নামে অভিযোগ থাকলে সরাসরি সুপার এজেন্টের কাছে অভিযোগ করতে হবে{" "}
                <a href="/super-agent" className="text-primary hover:underline">
                  বিস্তারিত জানতে এই লিংকে ক্লিক করুন
                </a>।
              </p>
            </div>
          </div>
          <div className="bg-[#1A1704] rounded-lg p-4 md:p-6 border border-primary/10">
            <h3 className="text-base md:text-lg font-semibold mb-3 md:mb-4 text-primary text-center">
              লোকাল মাস্টার এজেন্ট
            </h3>
            <div className="bg-[#2A2410] rounded p-3 md:p-4">
              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                লোকাল মাস্টার এজেন্টরা শুধু ইউজার একাউন্ট খুলে দিতে পারেন। কোন লোকাল মাস্টার এজেন্টের নামে অভিযোগ থাকলে সরাসরি অনলাইন মাস্টার এজেন্টের কাছে অভিযোগ করতে হবে{" "}
                <a href="/master-agent" className="text-primary hover:underline">
                  বিস্তারিত জানতে এই লিংকে ক্লিক করুন
                </a>।
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
