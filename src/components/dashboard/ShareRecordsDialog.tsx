import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface ShareRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorName?: string;
  onConfirm: () => void;
}

export function ShareRecordsDialog({ open, onOpenChange, doctorName, onConfirm }: ShareRecordsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share Medical Records</DialogTitle>
          <DialogDescription className="text-gray-600">
            You are about to share your medical records with {doctorName}.
          </DialogDescription>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            They will only have access during your consultation.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={onConfirm}>
              Share Records
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}