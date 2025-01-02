import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { AppointmentCard } from "./AppointmentCard";
import { ShareRecordsDialog } from "./ShareRecordsDialog";
import { filterAppointmentsByDate } from "@/utils/dateUtils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  forWhom?: string;
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
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string>("self");
  
  // This would typically come from your state management system
  const [dependents] = useState<Dependent[]>([
    {
      id: "1",
      name: "John Doe Jr",
      relation: "Son",
      age: "10",
      gender: "male",
      status: "approved"
    }
  ]);

  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2025-05-25",
      time: "10:00 AM",
      location: "Medical Center, Room 302",
      forWhom: "self"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2025-05-28",
      time: "2:30 PM",
      location: "Health Clinic, Room 105"
    },
    {
      id: "3",
      doctorName: "Dr. Emily Rodriguez",
      specialty: "Neurologist",
      date: "2025-05-30",
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

  const filteredAppointments = appointments.filter(appointment => {
    const isFiltered = filterAppointmentsByDate(appointment, type);
    console.log(`Filtering appointment ${appointment.id}:`, isFiltered);
    return isFiltered;
  });

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

  const handlePatientSelect = (value: string) => {
    setSelectedPatient(value);
    toast({
      title: "Patient Selected",
      description: `Appointment will be booked for ${value === 'self' ? 'yourself' : dependents.find(d => d.id === value)?.name}`,
    });
  };

  return (
    <>
      {type === "upcoming" && (
        <div className="mb-4">
          <Select value={selectedPatient} onValueChange={handlePatientSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select patient" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="self">Self</SelectItem>
              {dependents
                .filter(dep => dep.status === "approved")
                .map(dependent => (
                  <SelectItem key={dependent.id} value={dependent.id}>
                    {dependent.name} ({dependent.relation})
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}

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
