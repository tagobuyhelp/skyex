
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
          সেবার শর্তাবলী
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="h-6 w-6 text-primary" />
              সেবার শর্তাবলী
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <DialogDescription className="text-base text-foreground">
            স্কাইএক্স সেবা ব্যবহার করে, আপনি এই শর্তগুলিতে সম্মত হন:
            </DialogDescription>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>নিবন্ধনের সময় ব্যবহারকারীদের সঠিক তথ্য প্রদান করতে হবে।</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>প্রতি ব্যবহারকারীর একাধিক অ্যাকাউন্ট অনুমোদিত নয়।</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>আমাদের নীতিমালা লঙ্ঘন করলে ভেল্কি অ্যাকাউন্ট স্থগিত বা বাতিল করার অধিকার রাখে।</span>
              </li>
              <li className="flex gap-2">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span>অ্যাকাউন্টের নিরাপত্তা রক্ষার দায়িত্ব ব্যবহারকারীর।</span>
              </li>
            </ul>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}
