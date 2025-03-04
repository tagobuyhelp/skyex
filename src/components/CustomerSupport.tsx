import { Headset } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
export const CustomerSupport = () => {
  const supportAgents = [{
    id: 1,
    title: "Customer Support 1",
    phone: "+13159755293"
  }, {
    id: 2,
    title: "Customer Support 2",
    phone: "+13159755294"
  }];
  return <div className="fixed bottom-6 right-6 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button size="icon" className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border-4 border-background bg-lime-600 hover:bg-lime-500">
            <Headset className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md px-[15px] py-[14px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Headset className="h-6 w-6 text-emerald-500" />
              সহযোগিতা
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {supportAgents.map(agent => <div key={agent.id} className="p-4 rounded-lg bg-card hover:bg-card/80 transition-colors border border-primary/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <WhatsAppIcon className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{agent.title}</h3>
                      <p className="text-sm text-muted-foreground">{agent.phone}</p>
                    </div>
                  </div>
                  <a href={`https://wa.me/${agent.phone.replace(/\+/, '')}`} target="_blank" rel="noopener noreferrer" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Message
                  </a>
                </div>
              </div>)}
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};