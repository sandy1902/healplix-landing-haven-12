import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Appointment, AppointmentResponse } from "@/types/appointments";

export function useAppointments(patientId: string) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data: appointmentsData, error } = await supabase
        .from('appointments')
        .select(`
          id,
          appointment_date,
          status,
          notes,
          rating,
          doctor:profiles!appointments_doctor_id_fkey(
            first_name,
            last_name
          )
        `)
        .eq('patient_id', patientId);

      if (error) throw error;

      const formattedAppointments = (appointmentsData as AppointmentResponse[]).map(apt => ({
        id: apt.id,
        doctorName: `Dr. ${apt.doctor.first_name} ${apt.doctor.last_name}`,
        specialty: "General Medicine",
        date: new Date(apt.appointment_date).toLocaleDateString(),
        time: new Date(apt.appointment_date).toLocaleTimeString(),
        location: "Medical Center",
        notes: apt.notes || undefined,
        rating: apt.rating || undefined
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch appointments. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      fetchAppointments();
    }
  }, [patientId]);

  return { appointments, loading, refetch: fetchAppointments };
}