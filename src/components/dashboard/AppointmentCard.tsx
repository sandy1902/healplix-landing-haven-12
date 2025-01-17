import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Share2, Star } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: string;
    doctorName: string;
    specialty: string;
    date: string;
    time: string;
    location: string;
    rating?: number;
  };
  type: "upcoming" | "past";
  onShare?: (appointment: AppointmentCardProps["appointment"]) => void;
  onRate?: (appointment: AppointmentCardProps["appointment"]) => void;
}

export function AppointmentCard({ appointment, type, onShare, onRate }: AppointmentCardProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg hover:bg-accent transition-colors">
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
        {appointment.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{appointment.rating}</span>
          </div>
        )}
      </div>
      <div className="mt-4 md:mt-0 space-x-2">
        {type === "upcoming" && onShare && (
          <Button 
            variant="secondary"
            className="w-full md:w-auto"
            onClick={() => onShare(appointment)}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Records
          </Button>
        )}
        {type === "past" && onRate && !appointment.rating && (
          <Button 
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => onRate(appointment)}
          >
            <Star className="h-4 w-4 mr-2" />
            Rate Visit
          </Button>
        )}
      </div>
    </div>
  );
}