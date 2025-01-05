import { Clock, History, FileText, Users, Heart, Calculator, Stethoscope, Plus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import HealthCalculators from "./calculators/HealthCalculators";
import MedicalHistoryForm from "./MedicalHistoryForm";

export function DashboardTabs() {
  return (
    <div className="flex flex-col space-y-2">
      <TabsList className="flex flex-col bg-transparent space-y-2">
        <div className="flex flex-col space-y-2">
          <TabsTrigger 
            value="appointments" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <Clock className="h-5 w-5 mr-3" />
            Appointments
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="appointments" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <AppointmentList type="upcoming" />
          </TabsContent>

          <TabsTrigger 
            value="history" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <History className="h-5 w-5 mr-3" />
            History
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <AppointmentList type="past" />
          </TabsContent>

          <TabsTrigger 
            value="records" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <FileText className="h-5 w-5 mr-3" />
            Medical Records
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="records" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <MedicalRecords />
          </TabsContent>

          <TabsTrigger 
            value="medical-history" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <Stethoscope className="h-5 w-5 mr-3" />
            Medical History
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="medical-history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <MedicalHistoryForm />
          </TabsContent>

          <TabsTrigger 
            value="dependents" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <Users className="h-5 w-5 mr-3" />
            Dependents
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="dependents" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <Dependents />
          </TabsContent>

          <TabsTrigger 
            value="favorites" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <Heart className="h-5 w-5 mr-3" />
            Favorites
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="favorites" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <Favorites />
          </TabsContent>

          <TabsTrigger 
            value="calculators" 
            className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
          >
            <Calculator className="h-5 w-5 mr-3" />
            Health Calculators
            <Plus className="h-4 w-4 ml-auto" />
          </TabsTrigger>
          <TabsContent value="calculators" className="bg-white rounded-lg p-4 shadow-lg mb-2">
            <HealthCalculators />
          </TabsContent>
        </div>
      </TabsList>
    </div>
  );
}