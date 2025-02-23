
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { UserPlus, Save, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AgentWithContacts } from "@/types/agent";

type AgentManageModalProps = {
  agent?: AgentWithContacts;
  mode: "create" | "edit";
  agentType?: "site_admin" | "sub_admin" | "super_agent" | "master_agent";
  uplineOptions?: AgentWithContacts[];
  trigger?: React.ReactNode;
  onSuccess?: () => void;
};

export const AgentManageModal = ({
  agent,
  mode,
  agentType,
  uplineOptions = [],
  trigger,
  onSuccess,
}: AgentManageModalProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: agent?.name || "",
    agent_id: agent?.agent_id || "",
    type: agent?.type || agentType || "master_agent",
    reports_to: agent?.reports_to || "",
    whatsapp: agent?.agent_contacts[0]?.whatsapp || "",
    messenger: agent?.agent_contacts[0]?.messenger || "",
  });

  // Check if the current agent type requires an upline
  const requiresUpline = (type: string) => {
    return ["sub_admin", "super_agent", "master_agent"].includes(type);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "create") {
        // Create new agent
        const { data: newAgent, error: agentError } = await supabase
          .from("agents")
          .insert({
            name: formData.name,
            agent_id: formData.agent_id,
            type: formData.type,
            reports_to: formData.reports_to || null,
            rating: 1,
          })
          .select()
          .single();

        if (agentError) throw agentError;

        // Create agent contacts
        if (formData.whatsapp || formData.messenger) {
          const { error: contactsError } = await supabase
            .from("agent_contacts")
            .insert({
              agent_id: newAgent.id,
              whatsapp: formData.whatsapp || null,
              messenger: formData.messenger || null,
            });

          if (contactsError) throw contactsError;
        }

        toast({
          title: "এজেন্ট তৈরি সফল হয়েছে",
          description: "নতুন এজেন্ট সফলভাবে যোগ করা হয়েছে।",
        });
      } else {
        // Update existing agent
        if (!agent) throw new Error("No agent provided for update");

        const { error: agentError } = await supabase
          .from("agents")
          .update({
            name: formData.name,
            agent_id: formData.agent_id,
            type: formData.type,
            reports_to: formData.reports_to || null,
          })
          .eq("id", agent.id);

        if (agentError) throw agentError;

        // Update or create agent contacts
        if (agent.agent_contacts[0]?.id) {
          const { error: contactsError } = await supabase
            .from("agent_contacts")
            .update({
              whatsapp: formData.whatsapp || null,
              messenger: formData.messenger || null,
            })
            .eq("id", agent.agent_contacts[0].id);

          if (contactsError) throw contactsError;
        } else if (formData.whatsapp || formData.messenger) {
          const { error: contactsError } = await supabase
            .from("agent_contacts")
            .insert({
              agent_id: agent.id,
              whatsapp: formData.whatsapp || null,
              messenger: formData.messenger || null,
            });

          if (contactsError) throw contactsError;
        }

        toast({
          title: "এজেন্ট আপডেট সফল হয়েছে",
          description: "এজেন্টের তথ্য সফলভাবে আপডেট করা হয়েছে।",
        });
      }

      // Invalidate and refetch queries
      await queryClient.invalidateQueries({ queryKey: ["all-agents-dashboard"] });
      await queryClient.invalidateQueries({ queryKey: ["site-admins-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["sub-admins-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["super-agents-with-hierarchy"] });
      await queryClient.invalidateQueries({ queryKey: ["master-agents-with-hierarchy"] });

      setOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "একটি সমস্যা হয়েছে",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <UserPlus className="w-4 h-4 mr-2" />
            {mode === "create" ? "নতুন এজেন্ট" : "এজেন্ট আপডেট"}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "নতুন এজেন্ট যোগ করুন" : "এজেন্টের তথ্য আপডেট করুন"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">নাম</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent_id">এজেন্ট আইডি</Label>
            <Input
              id="agent_id"
              value={formData.agent_id}
              onChange={(e) => setFormData({ ...formData, agent_id: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">এজেন্ট টাইপ</Label>
            <Select
              value={formData.type}
              onValueChange={(value: any) => setFormData({ ...formData, type: value, reports_to: "" })}
              disabled={mode === "edit" || agentType !== undefined}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border border-primary/20">
                <SelectItem value="site_admin">সাইট এডমিন</SelectItem>
                <SelectItem value="sub_admin">সাব এডমিন</SelectItem>
                <SelectItem value="super_agent">সুপার এজেন্ট</SelectItem>
                <SelectItem value="master_agent">মাস্টার এজেন্ট</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {requiresUpline(formData.type) && uplineOptions.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="reports_to">আপলাইন</Label>
              <Select
                value={formData.reports_to}
                onValueChange={(value) => setFormData({ ...formData, reports_to: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="আপলাইন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border border-primary/20">
                  {uplineOptions.map((upline) => (
                    <SelectItem key={upline.id} value={upline.id}>
                      {upline.name} ({upline.agent_id})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="whatsapp">হোয়াটসঅ্যাপ নম্বর</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="WhatsApp নম্বর (ঐচ্ছিক)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="messenger">মেসেঞ্জার লিংক</Label>
            <Input
              id="messenger"
              value={formData.messenger}
              onChange={(e) => setFormData({ ...formData, messenger: e.target.value })}
              placeholder="Messenger লিংক (ঐচ্ছিক)"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              <X className="w-4 h-4 mr-1" />
              বাতিল
            </Button>
            <Button type="submit" disabled={isLoading}>
              <Save className="w-4 h-4 mr-1" />
              {isLoading ? "সংরক্ষণ হচ্ছে..." : "সংরক্ষণ করুন"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
