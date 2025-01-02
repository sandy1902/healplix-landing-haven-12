import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentId: string;
  doctorName: string;
  onSubmit: (rating: number, review: string) => void;
}

export function RatingDialog({
  open,
  onOpenChange,
  appointmentId,
  doctorName,
  onSubmit,
}: RatingDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState("");
  const { toast } = useToast();

  const handleSubmit = () => {
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }
    onSubmit(rating, review);
    setRating(0);
    setReview("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-[50%] top-[50%] z-[100] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] bg-white shadow-xl transition-all duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg border-2 border-gray-100">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Rate your appointment with {doctorName}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-10 w-10 cursor-pointer transition-all duration-200 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <div className="grid gap-2">
            <Textarea
              placeholder="Share your experience (optional)"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="min-h-[100px] resize-none border-2 focus:ring-2 focus:ring-secondary/50"
            />
          </div>
        </div>
        <DialogFooter className="sm:flex-row space-x-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="flex-1 sm:flex-none"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            className="flex-1 sm:flex-none bg-secondary hover:bg-secondary/90"
          >
            Submit Review
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}