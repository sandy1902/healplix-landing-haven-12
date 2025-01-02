export function filterAppointmentsByDate(appointment: { date: string }, type: "upcoming" | "past"): boolean {
  const appointmentDate = new Date(appointment.date);
  const today = new Date();
  
  // Reset time portions to midnight for accurate date comparison
  today.setHours(0, 0, 0, 0);
  appointmentDate.setHours(0, 0, 0, 0);
  
  if (type === "upcoming") {
    return appointmentDate >= today;
  } else {
    return appointmentDate < today;
  }
}