import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Profile {
  full_name: string | null;
}

interface Appointment {
  id: string;
  user_id: string;
  doctor_name: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: string;
  user: Profile | null;
  created_at: string;
  doctor_id: string;
  for_whom: string;
  rating: number | null;
  review: string | null;
  type: string;
}

export function AdminAppointmentList() {
  const { toast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const { data: appointments, isLoading } = useQuery({
    queryKey: ["admin-appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          user:profiles(full_name)
        `)
        .order("date", { ascending: true });

      if (error) throw error;
      return data as unknown as Appointment[];
    },
  });

  const handleStatusChange = async (appointmentId: string, newStatus: string) => {
    const { error } = await supabase
      .from("appointments")
      .update({ status: newStatus })
      .eq("id", appointmentId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update appointment status",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Appointment status updated successfully",
      });
    }
  };

  const filteredAppointments = appointments?.filter((appointment) =>
    selectedStatus === "all" ? true : appointment.status === selectedStatus
  );

  if (isLoading) return <div>Loading appointments...</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border rounded p-2"
        >
          <option value="all">All Status</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead>Specialty</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAppointments?.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.user?.full_name}</TableCell>
              <TableCell>{appointment.doctor_name}</TableCell>
              <TableCell>{appointment.specialty}</TableCell>
              <TableCell>{format(new Date(appointment.date), "PP")}</TableCell>
              <TableCell>{appointment.time}</TableCell>
              <TableCell>{appointment.location}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    appointment.status === "scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : appointment.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {appointment.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(appointment.id, "completed")
                    }
                    disabled={appointment.status === "completed"}
                  >
                    Complete
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleStatusChange(appointment.id, "cancelled")
                    }
                    disabled={appointment.status === "cancelled"}
                  >
                    Cancel
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}