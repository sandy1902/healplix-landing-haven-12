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
    <Tabs defaultValue="appointments" orientation="vertical" className="w-full">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col space-y-2">
          {/* Appointments Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="appointments" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <Clock className="h-5 w-5 mr-3" />
                Appointments
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="appointments" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <AppointmentList type="upcoming" />
            </TabsContent>
          </div>

          {/* History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <History className="h-5 w-5 mr-3" />
                History
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <AppointmentList type="past" />
            </TabsContent>
          </div>

          {/* Medical Records Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="records" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <FileText className="h-5 w-5 mr-3" />
                Medical Records
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="records" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <MedicalRecords />
            </TabsContent>
          </div>

          {/* Medical History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="medical-history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <Stethoscope className="h-5 w-5 mr-3" />
                Medical History
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="medical-history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <MedicalHistoryForm />
            </TabsContent>
          </div>

          {/* Dependents Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="dependents" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <Users className="h-5 w-5 mr-3" />
                Dependents
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="dependents" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <Dependents />
            </TabsContent>
          </div>

          {/* Favorites Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="favorites" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <Heart className="h-5 w-5 mr-3" />
                Favorites
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="favorites" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <Favorites />
            </TabsContent>
          </div>

          {/* Health Calculators Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="calculators" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
              >
                <Calculator className="h-5 w-5 mr-3" />
                Health Calculators
                <Plus className="h-4 w-4 ml-auto" />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="calculators" className="bg-white rounded-lg p-4 shadow-lg mb-2">
              <HealthCalculators />
            </TabsContent>
          </div>
        </div>
      </div>
    </Tabs>
  );
}