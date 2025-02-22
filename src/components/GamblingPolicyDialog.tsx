
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
import { Scale } from "lucide-react"

export function GamblingPolicyDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary text-sm">
          Gambling Policy
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Scale className="h-6 w-6 text-primary" />
              Gambling Policy
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription className="text-base text-foreground">
              VELKI is committed to responsible gambling and maintaining a safe gaming environment. 
              By using our services, you agree to the following:
            </DialogDescription>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Users must be 18 years or older to participate in any gambling activities.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>We encourage setting personal limits and practicing responsible gambling.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>VELKI reserves the right to suspend accounts showing signs of problem gambling.</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>Self-exclusion options are available upon request.</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
