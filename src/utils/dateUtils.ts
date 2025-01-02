export function filterAppointmentsByDate(appointment: { date: string }, type: "upcoming" | "past"): boolean {
  const appointmentDate = new Date(appointment.date);
  const today = new Date();
  
  // Set both dates to midnight for accurate date comparison
  today.setHours(0, 0, 0, 0);
  appointmentDate.setHours(0, 0, 0, 0);
  
  // For debugging
  console.log('Appointment Date:', appointmentDate);
  console.log('Today:', today);
  console.log('Type:', type);
  console.log('Is Upcoming:', appointmentDate >= today);
  
  if (type === "upcoming") {
    return appointmentDate >= today;
  }
  return appointmentDate < today;
}