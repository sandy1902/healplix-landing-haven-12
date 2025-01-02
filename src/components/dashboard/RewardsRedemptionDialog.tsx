import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface RewardsRedemptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePoints: number;
  onConfirm: (pointsToRedeem: number) => void;
}

export function RewardsRedemptionDialog({
  open,
  onOpenChange,
  availablePoints,
  onConfirm
}: RewardsRedemptionDialogProps) {
  const { toast } = useToast();
  const [pointsToRedeem, setPointsToRedeem] = useState<number>(0);

  const handleConfirm = () => {
    if (pointsToRedeem > availablePoints) {
      toast({
        variant: "destructive",
        title: "Invalid Points",
        description: "You cannot redeem more points than you have available.",
      });
      return;
    }

    if (pointsToRedeem < 0) {
      toast({
        variant: "destructive",
        title: "Invalid Points",
        description: "Please enter a valid number of points to redeem.",
      });
      return;
    }

    onConfirm(pointsToRedeem);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Redeem Reward Points</DialogTitle>
          <DialogDescription>
            You have {availablePoints} points available. Each point is worth ₹1.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Input
              id="points"
              type="number"
              placeholder="Enter points to redeem"
              value={pointsToRedeem}
              onChange={(e) => setPointsToRedeem(Number(e.target.value))}
              max={availablePoints}
              min={0}
            />
            <p className="text-sm text-muted-foreground">
              Value: ₹{pointsToRedeem}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>
            Redeem Points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}