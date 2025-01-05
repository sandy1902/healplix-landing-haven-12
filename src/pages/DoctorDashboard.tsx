import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  UserCog, 
  Calendar, 
  Clock,
  DollarSign,
  FileText,
  Stethoscope,
  Plus,
  Minus
} from "lucide-react";
import DoctorProfile from "@/components/doctor-dashboard/DoctorProfile";
import DoctorSchedule from "@/components/doctor-dashboard/DoctorSchedule";
import DoctorAppointments from "@/components/doctor-dashboard/DoctorAppointments";
import DoctorRevenue from "@/components/doctor-dashboard/DoctorRevenue";
import PatientRecords from "@/components/doctor-dashboard/patient/PatientRecords";
import Prescription from "@/components/doctor-dashboard/patient/Prescription";
import { Navbar } from "@/components/Navbar";
import { useState } from "react";

export default function DoctorDashboard() {
  const [openSection, setOpenSection] = useState<string | null>("profile");

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const TabSection = ({ value, label, icon: Icon, children }: { 
    value: string;
    label: string;
    icon: any;
    children: React.ReactNode;
  }) => {
    const isOpen = openSection === value;

    return (
      <div className="mb-2">
        <TabsList className="w-full bg-transparent p-0">
          <TabsTrigger 
            value={value} 
            className="w-full justify-start rounded-lg transition-all duration-200
              bg-white hover:bg-gray-50 
              data-[state=active]:bg-[#8B5CF6] data-[state=active]:text-white 
              shadow-sm hover:shadow-md
              text-lg py-3 px-6 
              border border-gray-100
              group"
            onClick={() => handleSectionClick(value)}
          >
            <div className="flex items-center w-full">
              <Icon className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
              <span className="font-medium">{label}</span>
              {isOpen ? (
                <Minus className="h-4 w-4 ml-auto opacity-70" />
              ) : (
                <Plus className="h-4 w-4 ml-auto opacity-70" />
              )}
            </div>
          </TabsTrigger>
        </TabsList>
        {isOpen && (
          <TabsContent 
            value={value} 
            className="mt-2 bg-white rounded-lg p-6 shadow-lg 
              border border-gray-100
              animate-fade-up"
          >
            {children}
          </TabsContent>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto py-24 px-4 space-y-6">
        <Tabs defaultValue="profile" className="w-full">
          <div className="flex flex-col space-y-2">
            <TabSection value="profile" label="Profile" icon={UserCog}>
              <DoctorProfile />
            </TabSection>

            <TabSection value="appointments" label="Appointments" icon={Calendar}>
              <DoctorAppointments />
            </TabSection>

            <TabSection value="schedule" label="Schedule" icon={Clock}>
              <DoctorSchedule />
            </TabSection>

            <TabSection value="records" label="Patient Records" icon={FileText}>
              <PatientRecords />
            </TabSection>

            <TabSection value="prescriptions" label="Prescriptions" icon={Stethoscope}>
              <Prescription />
            </TabSection>

            <TabSection value="revenue" label="Revenue" icon={DollarSign}>
              <DoctorRevenue />
            </TabSection>
          </div>
        </Tabs>
      </div>
    </div>
  );
}