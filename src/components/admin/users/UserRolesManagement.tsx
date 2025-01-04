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
import { UserTableRow } from "./UserTableRow";

type UserRole = Database["public"]["Enums"]["user_role"];

interface User {
  id: string;
  full_name: string;
  role: UserRole;
}

export function UserRolesManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
      return;
    }

    setUsers(data || []);
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    const { error } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "User role updated successfully",
    });

    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", userId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete user",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: "User deleted successfully",
    });

    fetchUsers();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Roles Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <UserTableRow
              key={user.id}
              user={user}
              onUpdateRole={updateUserRole}
              onDeleteUser={deleteUser}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}