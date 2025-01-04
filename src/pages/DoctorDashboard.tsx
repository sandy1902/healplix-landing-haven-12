import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserCog, 
  Calendar, 
  Clock,
  DollarSign,
  FileText,
  Stethoscope
} from "lucide-react";
import DoctorProfile from "@/components/doctor-dashboard/DoctorProfile";
import DoctorSchedule from "@/components/doctor-dashboard/DoctorSchedule";
import DoctorAppointments from "@/components/doctor-dashboard/DoctorAppointments";
import DoctorRevenue from "@/components/doctor-dashboard/DoctorRevenue";
import PatientRecords from "@/components/doctor-dashboard/patient/PatientRecords";
import Prescription from "@/components/doctor-dashboard/patient/Prescription";
import { Navbar } from "@/components/Navbar";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto py-24 px-4 space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto bg-white p-2 rounded-lg mb-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserCog className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="appointments" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Appointments
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Records
            </TabsTrigger>
            <TabsTrigger value="prescriptions" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Revenue
            </TabsTrigger>
          </TabsList>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <TabsContent value="profile" className="mt-0">
              <DoctorProfile />
            </TabsContent>

            <TabsContent value="appointments" className="mt-0">
              <DoctorAppointments />
            </TabsContent>

            <TabsContent value="schedule" className="mt-0">
              <DoctorSchedule />
            </TabsContent>

            <TabsContent value="records" className="mt-0">
              <PatientRecords />
            </TabsContent>

            <TabsContent value="prescriptions" className="mt-0">
              <Prescription />
            </TabsContent>

            <TabsContent value="revenue" className="mt-0">
              <DoctorRevenue />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
