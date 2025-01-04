export interface TimeSlot {
  time: string;
  available: boolean;
  videoConsultation: boolean;
  clinicAppointment: boolean;
}

export interface DaySchedule {
  day: string;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export interface AppointmentTime {
  date: Date | undefined;
  time: string | undefined;
}