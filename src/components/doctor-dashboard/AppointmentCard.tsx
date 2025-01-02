import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { Appointment } from "./types/appointment";

interface AppointmentCardProps {
  appointment: Appointment;
  onViewRecords: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onViewRecords }: AppointmentCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors">
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
        <p className="text-sm text-gray-500">
          {appointment.type} ({appointment.appointmentMode})
        </p>
      </div>
      <div className="mt-4 md:mt-0 space-x-2">
        <Button 
          variant="outline" 
          onClick={() => onViewRecords(appointment)}
        >
          View Records
        </Button>
        <Button variant="destructive">Cancel</Button>
      </div>
    </div>
  );
}