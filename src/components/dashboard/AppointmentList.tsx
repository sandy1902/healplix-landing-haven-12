import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AppointmentCard } from "./AppointmentCard";
import { ShareRecordsDialog } from "./ShareRecordsDialog";
import { filterAppointmentsByDate } from "@/utils/dateUtils";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2024-04-25",
      time: "10:00 AM",
      location: "Medical Center, Room 302"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-04-28",
      time: "2:30 PM",
      location: "Health Clinic, Room 105"
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "2024-04-30",
      time: "11:15 AM",
      location: "Neurology Center, Room 405"
    },
    {
      id: "4",
      doctorName: "Dr. James Thompson",
      specialty: "Orthopedist",
      date: "2024-02-15",
      time: "9:00 AM",
      location: "Orthopedic Clinic, Room 203"
    }
  ]);

  const filteredAppointments = appointments.filter(appointment => 
    filterAppointmentsByDate(appointment, type)
  );

  const handleShareRecords = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setShowShareDialog(true);
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

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{type === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredAppointments.length > 0 ? (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  type={type}
                  onShare={handleShareRecords}
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
    </>
  );
}