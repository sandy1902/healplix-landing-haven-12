export interface Appointment {
  id: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  forWhom?: string;
  rating?: number;
  notes?: string;
}

export interface AppointmentResponse {
  id: string;
  appointment_date: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string | null;
  rating: number | null;
  doctor: {
    first_name: string;
    last_name: string;
  };
}