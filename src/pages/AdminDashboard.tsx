import { AdminAnalyticsDashboard } from "@/components/admin/analytics/AdminAnalyticsDashboard";
import { AdminAppointmentList } from "@/components/admin/appointments/AdminAppointmentList";
import { SystemSettings } from "@/components/admin/settings/SystemSettings";
import AdminLogsViewer from "../components/admin/logs/AdminLogsViewer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="analytics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="logs">Activity Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <AdminAnalyticsDashboard />
        </TabsContent>

        <TabsContent value="appointments">
          <AdminAppointmentList />
        </TabsContent>

        <TabsContent value="settings">
          <SystemSettings />
        </TabsContent>

        <TabsContent value="logs">
          <AdminLogsViewer />
        </TabsContent>
      </Tabs>
    </div>
  );
}