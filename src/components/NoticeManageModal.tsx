
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NoticeManageModalProps {
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export const NoticeManageModal = ({ trigger, onSuccess }: NoticeManageModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success" | "error">("info");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('notices')
      .insert([{ title, content, type }]);

    if (error) {
      toast({
        variant: "destructive",
        title: "বিজ্ঞপ্তি যোগ করতে ব্যর্থ হয়েছে",
        description: error.message,
      });
      return;
    }

    toast({
      title: "বিজ্ঞপ্তি যোগ করা হয়েছে",
      description: "নতুন বিজ্ঞপ্তি সফলভাবে যোগ করা হয়েছে।",
    });

    setOpen(false);
    setTitle("");
    setContent("");
    setType("info");
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>নতুন বিজ্ঞপ্তি যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">শিরোনাম</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">বিষয়বস্তু</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">ধরন</Label>
            <Select value={type} onValueChange={(value: any) => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="info">তথ্য</SelectItem>
                <SelectItem value="warning">সতর্কতা</SelectItem>
                <SelectItem value="success">সফল</SelectItem>
                <SelectItem value="error">ত্রুটি</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">যোগ করুন</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
