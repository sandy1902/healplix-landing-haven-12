import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

type RegistrationStatus = Database["public"]["Enums"]["registration_status"];

interface RegistrationStatusBadgeProps {
  status: RegistrationStatus;
}

export function RegistrationStatusBadge({ status }: RegistrationStatusBadgeProps) {
  const getStatusColor = (status: RegistrationStatus) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} text-white`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}