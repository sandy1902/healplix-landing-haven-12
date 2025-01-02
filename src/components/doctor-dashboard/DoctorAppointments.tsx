import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";

export default function DoctorAppointments() {
  const appointments = [
    {
      id: 1,
      patientName: "John Doe",
      date: "2024-03-15",
      time: "10:00 AM",
      type: "Regular Checkup"
    },
    {
      id: 2,
      patientName: "Jane Smith",
      date: "2024-03-15",
      time: "2:30 PM",
      type: "Follow-up"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-secondary" />
                  <h3 className="font-semibold">{appointment.patientName}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  {appointment.date}
                  <Clock className="h-4 w-4 ml-2" />
                  {appointment.time}
                </div>
                <p className="text-sm text-gray-500">{appointment.type}</p>
              </div>
              <div className="mt-4 md:mt-0 space-x-2">
                <Button variant="outline">View Details</Button>
                <Button variant="destructive">Cancel</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}