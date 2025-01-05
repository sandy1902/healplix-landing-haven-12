import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ShareRecordsDialog } from "./ShareRecordsDialog";
import { PatientSelector } from "./PatientSelector";
import { useAppointments } from "@/hooks/use-appointments";
import { useCurrentUser } from "@/hooks/use-current-user";
import { AppointmentRating } from "./appointment/AppointmentRating";
import { AppointmentListContent } from "./appointment/AppointmentListContent";
import type { Appointment } from "@/types/appointments";

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("self");
  
  const { userId } = useCurrentUser();
  const { appointments, loading, refetch } = useAppointments(
    selectedPatient === 'self' ? userId : selectedPatient
  );

  const handleShareRecords = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowShareDialog(true);
  };

  const handleRate = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowRatingDialog(true);
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
          <AppointmentListContent
            appointments={appointments}
            type={type}
            onShare={handleShareRecords}
            onRate={handleRate}
          />
        </CardContent>
      </Card>

      <ShareRecordsDialog
        open={showShareDialog}
        onOpenChange={setShowShareDialog}
        doctorName={selectedAppointment?.doctorName}
        onConfirm={handleConfirmShare}
      />

      <AppointmentRating
        appointment={selectedAppointment}
        open={showRatingDialog}
        onOpenChange={setShowRatingDialog}
        onRatingComplete={refetch}
      />
    </>
  );
}