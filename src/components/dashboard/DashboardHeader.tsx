
import { Button } from "@/components/ui/button";
import { AgentManageModal } from "@/components/AgentManageModal";
import { NoticeManageModal } from "@/components/NoticeManageModal";
import { UserPlus, BellPlus, User, LogOut } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface DashboardHeaderProps {
  userEmail: string | null;
  onAgentUpdate: () => void;
  onAgentCreate: () => void;
  onLogout: () => void;
}

export const DashboardHeader = ({
  userEmail,
  onAgentUpdate,
  onAgentCreate,
  onLogout
}: DashboardHeaderProps) => {
  return <div className="mb-6 md:mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 backdrop-blur-lg bg-white/5 p-4 md:p-6 rounded-lg border border-white/10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">এডমিন ড্যাশবোর্ড</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          সমস্ত এজেন্টের বিস্তারিত তথ্য এবং পরিসংখ্যান দেখুন
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4 w-full md:w-auto">
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <NoticeManageModal trigger={<Button variant="outline" className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border-white/10">
                <BellPlus className="w-4 h-4 mr-2" />
                নতুন বিজ্ঞপ্তি
              </Button>} />
          <AgentManageModal mode="create" onSuccess={onAgentCreate} trigger={<Button className="w-full sm:w-auto bg-lime-500 hover:bg-lime-400">
                <UserPlus className="w-4 h-4 mr-2" />
                নতুন এজেন্ট
              </Button>} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            {userEmail && <>
                <DropdownMenuItem className="font-medium">
                  {userEmail}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>}
            <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              লগ আউট
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>;
};
