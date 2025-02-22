
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
import { Shield } from "lucide-react"

export function PrivacyPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary text-sm">
          Privacy Policy
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Shield className="h-6 w-6 text-primary" />
              Privacy Policy
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription className="text-base text-foreground">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information:
            </DialogDescription>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>We collect only necessary information for account creation and verification.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Your data is encrypted and stored securely.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>We never share your personal information with third parties without consent.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>You can request data deletion at any time.</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
