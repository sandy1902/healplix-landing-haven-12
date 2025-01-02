export function filterAppointmentsByDate(appointments: Array<{ date: string }>, type: "upcoming" | "past"): boolean {
  const appointmentDate = new Date(appointments.date);
  const today = new Date();
  
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const appointmentStart = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
  
  if (type === "upcoming") {
    return appointmentStart >= todayStart;
  } else {
    return appointmentStart < todayStart;
  }
}