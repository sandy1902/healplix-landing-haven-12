import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useState } from "react";

interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
}

export default function AppointmentList({ type }: { type: "upcoming" | "past" }) {
  // In a real application, this would come from your backend
  const [appointments] = useState<Appointment[]>([
    {
      id: "1",
      doctorName: "Dr. Sarah Wilson",
      specialty: "Cardiologist",
      date: "2024-03-15",
      time: "10:00 AM",
      location: "Medical Center, Room 302"
    },
    {
      id: "2",
      doctorName: "Dr. Michael Chen",
      specialty: "Dermatologist",
      date: "2024-03-20",
      time: "2:30 PM",
      location: "Health Clinic, Room 105"
    }
  ]);

  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    return type === "upcoming" ? appointmentDate >= today : appointmentDate < today;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "upcoming" ? "Upcoming Appointments" : "Past Appointments"}</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredAppointments.length > 0 ? (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold">{appointment.doctorName}</h3>
                  <p className="text-sm text-gray-500">{appointment.specialty}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    {appointment.date}
                    <Clock className="h-4 w-4 ml-2" />
                    {appointment.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {appointment.location}
                  </div>
                </div>
                {type === "upcoming" && (
                  <div className="mt-4 md:mt-0 space-x-2">
                    <Button variant="outline">Reschedule</Button>
                    <Button variant="destructive">Cancel</Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No {type} appointments</p>
        )}
      </CardContent>
    </Card>
  );
}