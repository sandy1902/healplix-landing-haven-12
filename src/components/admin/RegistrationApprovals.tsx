import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

interface Registration {
  id: string;
  full_name: string;
  role: string;
  registration_status: string;
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
      .select("id, full_name, role, registration_status")
      .eq("registration_status", "pending")
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

  const updateRegistrationStatus = async (userId: string, status: string) => {
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
            <TableRow key={registration.id}>
              <TableCell>{registration.full_name}</TableCell>
              <TableCell>
                <Badge>{registration.role}</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">
                  {registration.registration_status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateRegistrationStatus(registration.id, "approved")
                    }
                  >
                    <Check className="h-4 w-4 text-green-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      updateRegistrationStatus(registration.id, "rejected")
                    }
                  >
                    <X className="h-4 w-4 text-red-600" />
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