
import { Headset } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const CustomerSupport = () => {
  const supportAgents = [
    {
      id: 1,
      title: "Customer Support 1",
      phone: "+13159755293",
    },
    {
      id: 2,
      title: "Customer Support 2", 
      phone: "+13159755294",
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Headset className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md bg-[#0F1A2A]/95 backdrop-blur-md border-primary/20">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald-400">
              <Headset className="h-5 w-5" />
              সহযোগিতা
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {supportAgents.map((agent) => (
              <div 
                key={agent.id}
                className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Headset className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-white">{agent.title}</p>
                    <p className="text-sm text-emerald-400">{agent.phone}</p>
                  </div>
                </div>
                <a
                  href={`https://wa.me/${agent.phone.replace(/\+/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Message
                </a>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
