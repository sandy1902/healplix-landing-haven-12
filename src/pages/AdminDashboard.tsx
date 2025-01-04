import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRolesManagement } from "@/components/admin/UserRolesManagement";
import { RegistrationApprovals } from "@/components/admin/RegistrationApprovals";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAdminAccess = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      if (profile?.role !== "admin") {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page.",
          variant: "destructive",
        });
        navigate("/");
      }
    };

    checkAdminAccess();
  }, [navigate, toast]);

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Card className="border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="users" className="space-y-4">
            <TabsList>
              <TabsTrigger value="users">User Management</TabsTrigger>
              <TabsTrigger value="registrations">Registration Approvals</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <UserRolesManagement />
            </TabsContent>
            <TabsContent value="registrations">
              <RegistrationApprovals />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}