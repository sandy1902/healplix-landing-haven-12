import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { RegistrationStatusBadge } from "./RegistrationStatusBadge";
import { Database } from "@/integrations/supabase/types";

type RegistrationStatus = Database["public"]["Enums"]["registration_status"];

interface RegistrationTableRowProps {
  registration: {
    id: string;
    full_name: string;
    role: string;
    registration_status: RegistrationStatus;
  };
  onUpdateStatus: (userId: string, status: RegistrationStatus) => void;
}

export function RegistrationTableRow({ registration, onUpdateStatus }: RegistrationTableRowProps) {
  return (
    <TableRow>
      <TableCell>{registration.full_name}</TableCell>
      <TableCell>{registration.role}</TableCell>
      <TableCell>
        <RegistrationStatusBadge status={registration.registration_status} />
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(registration.id, "approved")}
            disabled={registration.registration_status === "approved"}
          >
            <Check className="h-4 w-4 text-green-500" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onUpdateStatus(registration.id, "rejected")}
            disabled={registration.registration_status === "rejected"}
          >
            <X className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}