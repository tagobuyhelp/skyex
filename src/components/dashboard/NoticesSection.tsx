
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoticeListStatic } from "@/components/NoticeListStatic";
import { Activity } from "lucide-react";

export const NoticesSection = () => {
  return (
    <Card className="bg-gradient-to-br from-white to-gray-100 backdrop-blur-sm col-span-1 lg:col-span-2 border-primary/10">
      <CardHeader className="border-b border-primary/10">
        <CardTitle className="text-base md:text-lg flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          সাম্প্রতিক বিজ্ঞপ্তি
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 md:pt-6">
        <NoticeListStatic />
      </CardContent>
    </Card>
  );
};
