import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegistrationApprovals } from "@/components/admin/registration/RegistrationApprovals";
import { UserRolesManagement } from "@/components/admin/users/UserRolesManagement";
import { AdminAppointmentList } from "@/components/admin/appointments/AdminAppointmentList";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        <Tabs defaultValue="registrations" className="space-y-4">
          <TabsList>
            <TabsTrigger value="registrations">Registration Approvals</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
          </TabsList>
          
          <TabsContent value="registrations">
            <div className="bg-white p-6 rounded-lg shadow">
              <RegistrationApprovals />
            </div>
          </TabsContent>
          
          <TabsContent value="users">
            <div className="bg-white p-6 rounded-lg shadow">
              <UserRolesManagement />
            </div>
          </TabsContent>
          
          <TabsContent value="appointments">
            <div className="bg-white p-6 rounded-lg shadow">
              <AdminAppointmentList />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
}