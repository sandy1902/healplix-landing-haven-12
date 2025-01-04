import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Database } from "@/integrations/supabase/types";
import { RegistrationTableRow } from "./RegistrationTableRow";

type RegistrationStatus = Database["public"]["Enums"]["registration_status"];

interface Registration {
  id: string;
  full_name: string;
  role: string;
  registration_status: RegistrationStatus;
}

export function RegistrationApprovals() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch registrations",
        variant: "destructive",
      });
      return;
    }

    setRegistrations(data || []);
  };

  const updateRegistrationStatus = async (userId: string, status: RegistrationStatus) => {
    const { error } = await supabase
      .from("profiles")
      .update({ registration_status: status })
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update registration status",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: `Registration ${status} successfully`,
    });

    fetchRegistrations();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Registration Approvals</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <RegistrationTableRow
              key={registration.id}
              registration={registration}
              onUpdateStatus={updateRegistrationStatus}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}