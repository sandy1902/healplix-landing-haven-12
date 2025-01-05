import { Button } from "@/components/ui/button";
import { Calendar, Clock, User } from "lucide-react";
import { Appointment } from "./types/appointment";

interface AppointmentCardProps {
  appointment: Appointment;
  onViewRecords: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onViewRecords }: AppointmentCardProps) {
  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg hover:bg-accent transition-colors">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-secondary" />
          <h3 className="font-semibold">{appointment.patientName}</h3>
        </div>
        <div className="flex flex-wrap gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {appointment.date}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {appointment.time}
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {appointment.type} ({appointment.appointmentMode})
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          onClick={() => onViewRecords(appointment)}
          className="w-full sm:w-auto"
        >
          View Records
        </Button>
        <Button 
          variant="destructive"
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}