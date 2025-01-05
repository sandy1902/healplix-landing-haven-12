import { Clock, History, FileText, Users, Heart, Calculator, Stethoscope, Plus, Minus } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import AppointmentList from "./AppointmentList";
import MedicalRecords from "./MedicalRecords";
import Dependents from "./Dependents";
import Favorites from "./Favorites";
import HealthCalculators from "./calculators/HealthCalculators";
import MedicalHistoryForm from "./MedicalHistoryForm";

export function DashboardTabs() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleSectionClick = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

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
                onClick={() => handleSectionClick('appointments')}
              >
                <Clock className="h-5 w-5 mr-3" />
                Appointments
                {openSection === 'appointments' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'appointments' && (
              <TabsContent value="appointments" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <AppointmentList type="upcoming" />
              </TabsContent>
            )}
          </div>

          {/* History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('history')}
              >
                <History className="h-5 w-5 mr-3" />
                History
                {openSection === 'history' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'history' && (
              <TabsContent value="history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <AppointmentList type="past" />
              </TabsContent>
            )}
          </div>

          {/* Medical Records Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="records" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('records')}
              >
                <FileText className="h-5 w-5 mr-3" />
                Medical Records
                {openSection === 'records' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'records' && (
              <TabsContent value="records" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <MedicalRecords />
              </TabsContent>
            )}
          </div>

          {/* Medical History Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="medical-history" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('medical-history')}
              >
                <Stethoscope className="h-5 w-5 mr-3" />
                Medical History
                {openSection === 'medical-history' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'medical-history' && (
              <TabsContent value="medical-history" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <MedicalHistoryForm />
              </TabsContent>
            )}
          </div>

          {/* Dependents Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="dependents" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('dependents')}
              >
                <Users className="h-5 w-5 mr-3" />
                Dependents
                {openSection === 'dependents' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'dependents' && (
              <TabsContent value="dependents" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <Dependents />
              </TabsContent>
            )}
          </div>

          {/* Favorites Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="favorites" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('favorites')}
              >
                <Heart className="h-5 w-5 mr-3" />
                Favorites
                {openSection === 'favorites' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'favorites' && (
              <TabsContent value="favorites" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <Favorites />
              </TabsContent>
            )}
          </div>

          {/* Health Calculators Section */}
          <div>
            <TabsList className="w-full bg-transparent p-0">
              <TabsTrigger 
                value="calculators" 
                className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
                onClick={() => handleSectionClick('calculators')}
              >
                <Calculator className="h-5 w-5 mr-3" />
                Health Calculators
                {openSection === 'calculators' ? (
                  <Minus className="h-4 w-4 ml-auto" />
                ) : (
                  <Plus className="h-4 w-4 ml-auto" />
                )}
              </TabsTrigger>
            </TabsList>
            {openSection === 'calculators' && (
              <TabsContent value="calculators" className="bg-white rounded-lg p-4 shadow-lg mb-2">
                <HealthCalculators />
              </TabsContent>
            )}
          </div>
        </div>
      </div>
    </Tabs>
  );
}