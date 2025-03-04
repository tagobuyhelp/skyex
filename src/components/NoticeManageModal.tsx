import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
interface NoticeManageModalProps {
  trigger: React.ReactNode;
  onSuccess?: () => void;
}
export const NoticeManageModal = ({
  trigger,
  onSuccess
}: NoticeManageModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"info" | "warning" | "success" | "error">("info");
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: {
          session
        }
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          variant: "destructive",
          title: "অননুমোদিত অ্যাক্সেস",
          description: "বিজ্ঞপ্তি যোগ করার জন্য লগইন করুন"
        });
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, toast]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const {
      error
    } = await supabase.from('notices').insert([{
      title,
      type,
      content: ""
    }]);
    if (error) {
      toast({
        variant: "destructive",
        title: "বিজ্ঞপ্তি যোগ করতে ব্যর্থ হয়েছে",
        description: error.message
      });
      return;
    }
    toast({
      title: "বিজ্ঞপ্তি যোগ করা হয়েছে",
      description: "নতুন বিজ্ঞপ্তি সফলভাবে যোগ করা হয়েছে।"
    });
    setOpen(false);
    setTitle("");
    setType("info");
    onSuccess?.();
  };
  return <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] px-[30px] py-[20px]">
        <DialogHeader>
          <DialogTitle>নতুন বিজ্ঞপ্তি যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">শিরোনাম</Label>
            <Input id="title" value={title} onChange={e => setTitle(e.target.value)} required />
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
    </Dialog>;
};