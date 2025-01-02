import { format } from "date-fns";
import { Doctor } from "@/types/doctor";

interface AppointmentSummaryProps {
  doctor: Doctor;
  selectedPatient: string;
  consultationType: string;
  date: Date | undefined;
  selectedTime: string | undefined;
  dependents: Array<{ id: string; name: string; relation: string; status: "approved" }>;
}

export function AppointmentSummary({
  doctor,
  selectedPatient,
  consultationType,
  date,
  selectedTime,
  dependents,
}: AppointmentSummaryProps) {
  return (
    <div className="bg-accent rounded-lg p-3">
      <h3 className="text-lg font-semibold mb-2 text-primary">Appointment Summary</h3>
      <div className="space-y-1 text-sm">
        <p>Doctor: {doctor.name}</p>
        <p>Patient: {selectedPatient === "self" ? "Self" : 
          dependents.find(d => d.id === selectedPatient)?.name || "Not selected"}</p>
        <p>Type: {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)}</p>
        <p>Date: {date ? format(date, 'MMMM do, yyyy') : 'Not selected'}</p>
        <p>Time: {selectedTime || 'Not selected'}</p>
        <p>Location: {doctor.clinicName}</p>
      </div>
    </div>
  );
}