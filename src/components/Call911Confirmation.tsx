
import React from 'react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Phone, AlertTriangle } from 'lucide-react';

interface Call911ConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const Call911Confirmation: React.FC<Call911ConfirmationProps> = ({
  open,
  onOpenChange,
  onConfirm
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-emergency">
            <AlertTriangle className="h-5 w-5" />
            Emergency Call Confirmation
          </AlertDialogTitle>
          <AlertDialogDescription>
            You are about to call emergency services (911). 
            This should only be used for genuine emergencies requiring immediate assistance.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="bg-emergency hover:bg-emergency/90">
            <Phone className="mr-2 h-4 w-4" />
            Confirm Call to 911
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Call911Confirmation;
