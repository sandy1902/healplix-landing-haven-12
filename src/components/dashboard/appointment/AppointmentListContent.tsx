import { AppointmentCard } from "../AppointmentCard";
import { filterAppointmentsByDate } from "@/utils/dateUtils";
import type { Appointment } from "@/types/appointments";

interface AppointmentListContentProps {
  appointments: Appointment[];
  type: "upcoming" | "past";
  onShare: (appointment: Appointment) => void;
  onRate: (appointment: Appointment) => void;
}

export function AppointmentListContent({
  appointments,
  type,
  onShare,
  onRate,
}: AppointmentListContentProps) {
  const filteredAppointments = appointments
    .filter((appointment) => filterAppointmentsByDate(appointment, type));

  if (filteredAppointments.length === 0) {
    return <p className="text-gray-500">No {type} appointments</p>;
  }

  return (
    <div className="space-y-4">
      {filteredAppointments.map((appointment) => (
        <AppointmentCard
          key={appointment.id}
          appointment={appointment}
          type={type}
          onShare={onShare}
          onRate={onRate}
        />
      ))}
    </div>
  );
}