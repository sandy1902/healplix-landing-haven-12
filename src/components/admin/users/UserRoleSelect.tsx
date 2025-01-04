import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface UserRoleSelectProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function UserRoleSelect({ currentRole, onRoleChange }: UserRoleSelectProps) {
  return (
    <Select defaultValue={currentRole} onValueChange={onRoleChange}>
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="user">User</SelectItem>
        <SelectItem value="doctor">Doctor</SelectItem>
        <SelectItem value="executive">Executive</SelectItem>
        <SelectItem value="admin">Admin</SelectItem>
      </SelectContent>
    </Select>
  );
}