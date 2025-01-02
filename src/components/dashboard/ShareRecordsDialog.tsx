import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ShareRecordsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctorName?: string;
  onConfirm: () => void;
}

export function ShareRecordsDialog({ open, onOpenChange, doctorName, onConfirm }: ShareRecordsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Medical Records</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to share your medical records with {doctorName}? 
            They will only have access during your consultation.
          </p>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>
              Share Records
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}