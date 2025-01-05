import { Navbar } from "@/components/Navbar";
import DoctorProfile from "@/components/doctor-dashboard/DoctorProfile";
import { DoctorDashboardTabs } from "@/components/doctor-dashboard/tabs/DoctorDashboardTabs";

export default function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto py-24 px-4 space-y-6">
        <DoctorProfile />
        <DoctorDashboardTabs />
      </div>
    </div>
  );
}