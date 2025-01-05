import { Clock, History, FileText, Gift, Calculator, Stethoscope, UserPlus, Heart, Bell } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { useState } from "react";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import HealthCalculators from "./calculators/HealthCalculators";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { TabSection } from "./tabs/TabSection";
import { RewardsTab } from "./tabs/RewardsTab";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import Notifications from "./Notifications";

export function DashboardTabs() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <Tabs defaultValue="appointments" orientation="vertical" className="w-full">
      <div className="flex flex-col space-y-2">
        <TabSection
          value="appointments"
          label="Appointments"
          icon={Clock}
          isOpen={openSection === 'appointments'}
          onToggle={() => handleSectionClick('appointments')}
        >
          <AppointmentList type="upcoming" />
        </TabSection>

        <TabSection
          value="history"
          label="History"
          icon={History}
          isOpen={openSection === 'history'}
          onToggle={() => handleSectionClick('history')}
        >
          <AppointmentList type="past" />
        </TabSection>

        <TabSection
          value="records"
          label="Medical Records"
          icon={FileText}
          isOpen={openSection === 'records'}
          onToggle={() => handleSectionClick('records')}
        >
          <MedicalRecords />
        </TabSection>

        <TabSection
          value="medical-history"
          label="Medical History"
          icon={Stethoscope}
          isOpen={openSection === 'medical-history'}
          onToggle={() => handleSectionClick('medical-history')}
        >
          <MedicalHistoryForm />
        </TabSection>

        <TabSection
          value="dependents"
          label="Dependents"
          icon={UserPlus}
          isOpen={openSection === 'dependents'}
          onToggle={() => handleSectionClick('dependents')}
        >
          <Dependents />
        </TabSection>

        <TabSection
          value="favorites"
          label="Favorites"
          icon={Heart}
          isOpen={openSection === 'favorites'}
          onToggle={() => handleSectionClick('favorites')}
        >
          <Favorites />
        </TabSection>

        <TabSection
          value="rewards"
          label="Rewards"
          icon={Gift}
          isOpen={openSection === 'rewards'}
          onToggle={() => handleSectionClick('rewards')}
        >
          <RewardsTab />
        </TabSection>

        <TabSection
          value="notifications"
          label="Notifications"
          icon={Bell}
          isOpen={openSection === 'notifications'}
          onToggle={() => handleSectionClick('notifications')}
        >
          <Notifications />
        </TabSection>

        <TabSection
          value="calculators"
          label="Health Calculators"
          icon={Calculator}
          isOpen={openSection === 'calculators'}
          onToggle={() => handleSectionClick('calculators')}
        >
          <HealthCalculators />
        </TabSection>
      </div>
    </Tabs>
  );
}