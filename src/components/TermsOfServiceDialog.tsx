
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
} from "@/components/ui/dialog"
import { FileText } from "lucide-react"

export function TermsOfServiceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary text-sm">
          Terms of Service
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-primary" />
              Terms of Service
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription className="text-base text-foreground">
              By using VELKI services, you agree to these terms:
            </DialogDescription>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Users must provide accurate information during registration.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Multiple accounts per user are not permitted.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>VELKI reserves the right to suspend or terminate accounts violating our policies.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Users are responsible for maintaining account security.</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
