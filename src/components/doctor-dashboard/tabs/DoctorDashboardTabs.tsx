import { 
  Calendar, 
  Clock,
  DollarSign,
  FileText,
  Stethoscope,
  History
} from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import DoctorAppointments from "../DoctorAppointments";
import DoctorSchedule from "../DoctorSchedule";
import DoctorRevenue from "../DoctorRevenue";
import PatientRecords from "../patient/PatientRecords";
import Prescription from "../patient/Prescription";
import PastAppointments from "../PastAppointments";
import { TabSection } from "@/components/dashboard/tabs/TabSection";

export function DoctorDashboardTabs() {
  const [openSection, setOpenSection] = useState<string | null>("appointments");

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Tabs defaultValue="appointments" className="w-full">
      <div className="flex flex-col space-y-2">
        <TabSection 
          value="appointments" 
          label="Appointments" 
          icon={Calendar}
          isOpen={openSection === 'appointments'}
          onToggle={() => handleSectionClick('appointments')}
        >
          <DoctorAppointments />
        </TabSection>

        <TabSection 
          value="past-appointments" 
          label="Past Appointments" 
          icon={History}
          isOpen={openSection === 'past-appointments'}
          onToggle={() => handleSectionClick('past-appointments')}
        >
          <PastAppointments />
        </TabSection>

        <TabSection 
          value="schedule" 
          label="Schedule Marker" 
          icon={Clock}
          isOpen={openSection === 'schedule'}
          onToggle={() => handleSectionClick('schedule')}
        >
          <DoctorSchedule />
        </TabSection>

        <TabSection 
          value="records" 
          label="Patient Records" 
          icon={FileText}
          isOpen={openSection === 'records'}
          onToggle={() => handleSectionClick('records')}
        >
          <PatientRecords />
        </TabSection>

        <TabSection 
          value="prescriptions" 
          label="Prescriptions" 
          icon={Stethoscope}
          isOpen={openSection === 'prescriptions'}
          onToggle={() => handleSectionClick('prescriptions')}
        >
          <Prescription />
        </TabSection>

        <TabSection 
          value="revenue" 
          label="Revenue" 
          icon={DollarSign}
          isOpen={openSection === 'revenue'}
          onToggle={() => handleSectionClick('revenue')}
        >
          <DoctorRevenue />
        </TabSection>
      </div>
    </Tabs>
  );
}