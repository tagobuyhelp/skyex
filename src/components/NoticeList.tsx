
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertCircle, Info, AlertTriangle, CheckCircle, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Notice {
  id: string;
  title: string;
  content: string;
  type: "info" | "warning" | "success" | "error";
  created_at: string;
}

export const NoticeList = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const user = supabase.auth.getUser();

  const { data: notices = [] } = useQuery({
    queryKey: ["notices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notices")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data as Notice[];
    },
  });

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('notices')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        variant: "destructive",
        title: "বিজ্ঞপ্তি মুছে ফেলতে ব্যর্থ হয়েছে",
        description: error.message,
      });
      return;
    }

    toast({
      title: "বিজ্ঞপ্তি মুছে ফেলা হয়েছে",
      description: "বিজ্ঞপ্তিটি সফলভাবে মুছে ফেলা হয়েছে।",
    });

    // Refresh the notices list
    queryClient.invalidateQueries({ queryKey: ["notices"] });
  };

  const getIcon = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return Info;
      case "warning":
        return AlertTriangle;
      case "success":
        return CheckCircle;
      case "error":
        return AlertCircle;
    }
  };

  const getTypeStyles = (type: Notice["type"]) => {
    switch (type) {
      case "info":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "success":
        return "text-green-400";
      case "error":
        return "text-red-400";
    }
  };

  return (
    <div className="space-y-4">
      {notices.map((notice) => {
        const Icon = getIcon(notice.type);
        return (
          <div
            key={notice.id}
            className="flex items-start gap-4 p-3 rounded-lg bg-background/50 group"
          >
            <Icon className={cn("w-4 h-4 mt-1", getTypeStyles(notice.type))} />
            <div className="flex-1">
              <p className="text-sm font-medium">{notice.title}</p>
              <p className="text-sm text-muted-foreground">{notice.content}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(notice.created_at).toLocaleString('bn-BD')}
              </p>
            </div>
            {user && (
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleDelete(notice.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};
