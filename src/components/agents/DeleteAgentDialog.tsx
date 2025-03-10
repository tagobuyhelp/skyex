
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAgentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const DeleteAgentDialog: React.FC<DeleteAgentDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">আপনি কি নিশ্চিত?</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            এই এজেন্টের সমস্ত তথ্য স্থায়ীভাবে মুছে ফেলা হবে। এই ক্রিয়াটি আর ফিরিয়ে নেওয়া যাবে না।
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-base">বাতিল</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="text-base">ডিলিট করুন</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
