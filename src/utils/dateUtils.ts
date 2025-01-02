export function filterAppointmentsByDate(appointment: { date: string }, type: "upcoming" | "past"): boolean {
  const appointmentDate = new Date(appointment.date);
  const today = new Date();
  
  // Set both dates to midnight for accurate date comparison
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const appointmentStart = new Date(appointmentDate.getFullYear(), appointmentDate.getMonth(), appointmentDate.getDate());
  
  if (type === "upcoming") {
    return appointmentStart >= todayStart;
  } else {
    return appointmentStart < todayStart;
  }
}