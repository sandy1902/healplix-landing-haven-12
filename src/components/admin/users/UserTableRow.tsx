import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { UserCheck, Trash } from "lucide-react";
import { UserRoleSelect } from "./UserRoleSelect";
import { Database } from "@/integrations/supabase/types";

type UserRole = Database["public"]["Enums"]["user_role"];

interface UserTableRowProps {
  user: {
    id: string;
    full_name: string;
    role: UserRole;
  };
  onUpdateRole: (userId: string, role: UserRole) => void;
  onDeleteUser: (userId: string) => void;
}

export function UserTableRow({ user, onUpdateRole, onDeleteUser }: UserTableRowProps) {
  return (
    <TableRow>
      <TableCell>{user.full_name}</TableCell>
      <TableCell>
        <UserRoleSelect
          currentRole={user.role}
          onRoleChange={(role) => onUpdateRole(user.id, role)}
        />
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDeleteUser(user.id)}
          >
            <Trash className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}