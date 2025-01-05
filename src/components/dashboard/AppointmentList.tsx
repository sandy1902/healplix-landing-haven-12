import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AppointmentCard } from "./AppointmentCard";
import { ShareRecordsDialog } from "./ShareRecordsDialog";
import { RatingDialog } from "./RatingDialog";
import { filterAppointmentsByDate } from "@/utils/dateUtils";
import { PatientSelector } from "./PatientSelector";
import { supabase } from "@/integrations/supabase/client";
import { useAppointments } from "@/hooks/use-appointments";
import type { Appointment } from "@/types/appointments";

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("self");
  
  const { appointments, loading, refetch } = useAppointments(
    selectedPatient === 'self' 
      ? (supabase.auth.getUser()).data.user?.id || '' 
      : selectedPatient
  );

  const handleShareRecords = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowShareDialog(true);
  };

  const handleRate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowRatingDialog(true);
  };

  const handleRatingSubmit = async (rating: number, review: string) => {
    if (selectedAppointment) {
      try {
        const { error } = await supabase
          .from('appointments')
          .update({ rating, notes: review })
          .eq('id', selectedAppointment.id);

        if (error) throw error;

        refetch();
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
    setShowRatingDialog(false);
  };

  const handleConfirmShare = () => {
    if (selectedAppointment) {
      toast({
        title: "Records Shared Successfully",
        description: `Medical records have been shared with ${selectedAppointment.doctorName}`,
      });
      setShowShareDialog(false);
    }
  };

  const handlePatientSelect = (value: string) => {
    setSelectedPatient(value);
    toast({
      title: "Patient Selected",
      description: `Appointment will be booked for ${
        value === "self" ? "yourself" : "your dependent"
      }`,
    });
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <>
      {type === "upcoming" && (
        <PatientSelector
          selectedPatient={selectedPatient}
          onPatientSelect={handlePatientSelect}
          dependents={[]}
        />
      )}

      <Card>
        <CardHeader>
          <CardTitle>
            {type === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (
            <div className="space-y-4">
              {appointments
                .filter((appointment) => filterAppointmentsByDate(appointment, type))
                .map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    type={type}
                    onShare={handleShareRecords}
                    onRate={handleRate}
                  />
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No {type} appointments</p>
          )}
        </CardContent>
      </Card>

      <ShareRecordsDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        doctorName={selectedAppointment?.doctorName}
        onConfirm={handleConfirmShare}
      />

      {selectedAppointment && (
        <RatingDialog
          open={showRatingDialog}
          onOpenChange={setShowRatingDialog}
          appointmentId={selectedAppointment.id}
          doctorName={selectedAppointment.doctorName}
          onSubmit={handleRatingSubmit}
        />
      )}
    </>
  );
}