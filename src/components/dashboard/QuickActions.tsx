
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, AlertTriangle, Shield, Rocket } from "lucide-react";

export const QuickActions = () => {
  return (
    <Card className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-white/10">
      <CardHeader className="border-b border-white/10">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          দ্রুত অ্যাকশন
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6">
        <div className="space-y-2">
          <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            নতুন এজেন্ট যোগ করুন
          </button>
          <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-primary" />
            অভিযোগ তালিকা দেখুন
          </button>
          <button className="w-full text-left px-3 md:px-4 py-2.5 md:py-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            সিস্টেম সেটিংস
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
