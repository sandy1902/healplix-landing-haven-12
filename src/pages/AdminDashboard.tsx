import { SystemSettings } from "@/components/admin/settings/SystemSettings";
import { AdminAppointmentList } from "@/components/admin/appointments/AdminAppointmentList";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <AdminAppointmentList />
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <SystemSettings />
        </div>
      </div>
    </div>
  );
}