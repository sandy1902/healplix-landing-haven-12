import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AppointmentCard } from "./AppointmentCard";
import { ShareRecordsDialog } from "./ShareRecordsDialog";
import { RatingDialog } from "./RatingDialog";
import { filterAppointmentsByDate } from "@/utils/dateUtils";
import { PatientSelector } from "./PatientSelector";
import { supabase } from "@/integrations/supabase/client";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  forWhom?: string;
  rating?: number;
}

interface Dependent {
  id: string;
  name: string;
  relation: string;
  age: string;
  gender: string;
  status: "pending" | "approved" | "rejected";
}

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("self");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [type, selectedPatient]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data: appointmentsData, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          status,
          notes,
          doctor:profiles!appointments_doctor_id_fkey(
            first_name,
            last_name
          )
        `)
        .eq('patient_id', selectedPatient === 'self' ? (await supabase.auth.getUser()).data.user?.id : selectedPatient);

      if (error) throw error;

      const formattedAppointments = appointmentsData.map(apt => ({
        id: apt.id,
        doctorName: `Dr. ${apt.doctor.first_name} ${apt.doctor.last_name}`,
        specialty: "General Medicine", // You might want to add this to the profiles table
        date: new Date(apt.appointment_date).toLocaleDateString(),
        time: new Date(apt.appointment_date).toLocaleTimeString(),
        location: "Medical Center", // You might want to add this to the appointments table
        notes: apt.notes
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch appointments. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

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
          .update({ rating })
          .eq('id', selectedAppointment.id);

        if (error) throw error;

        setAppointments(appointments.map(apt => 
          apt.id === selectedAppointment.id ? { ...apt, rating } : apt
        ));

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
          dependents={[]} // You'll need to fetch this from the dependents table
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