import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RatingDialog } from "../RatingDialog";
import { supabase } from "@/integrations/supabase/client";
import type { Appointment } from "@/types/appointments";

interface AppointmentRatingProps {
  appointment: Appointment | null;
  onRatingComplete: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentRating({ 
  appointment, 
  onRatingComplete, 
  open, 
  onOpenChange 
}: AppointmentRatingProps) {
  const { toast } = useToast();

  const handleRatingSubmit = async (rating: number, review: string) => {
    if (appointment) {
      try {
        const { error } = await supabase
          .from('appointments')
          .update({ rating, notes: review })
          .eq('id', appointment.id);

        if (error) throw error;

        onRatingComplete();
        toast({
          title: "Review Submitted",
          description: "Thank you for rating your appointment!",
        });
      } catch (error) {
        console.error('Error submitting rating:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to submit rating. Please try again later.",
        });
      }
    }
    onOpenChange(false);
  };

  return appointment ? (
    <RatingDialog
      open={open}
      onOpenChange={onOpenChange}
      appointmentId={appointment.id}
      doctorName={appointment.doctorName}
      onSubmit={handleRatingSubmit}
    />
  ) : null;
}