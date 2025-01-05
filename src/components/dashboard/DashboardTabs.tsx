import { Clock, History, FileText, Users, Heart, Calculator, Stethoscope } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <TabsList className="flex flex-col h-auto w-full sm:w-64 justify-start bg-white py-4 px-2 rounded-lg mb-4 space-y-2">
      <TabsTrigger 
        value="appointments" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <Clock className="h-5 w-5 mr-3" />
        Appointments
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <History className="h-5 w-5 mr-3" />
        History
      </TabsTrigger>
      <TabsTrigger 
        value="records" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <FileText className="h-5 w-5 mr-3" />
        Medical Records
      </TabsTrigger>
      <TabsTrigger 
        value="medical-history" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <Stethoscope className="h-5 w-5 mr-3" />
        Medical History
      </TabsTrigger>
      <TabsTrigger 
        value="dependents" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <Users className="h-5 w-5 mr-3" />
        Dependents
      </TabsTrigger>
      <TabsTrigger 
        value="favorites" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <Heart className="h-5 w-5 mr-3" />
        Favorites
      </TabsTrigger>
      <TabsTrigger 
        value="calculators" 
        className="w-full justify-start data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3 px-4"
      >
        <Calculator className="h-5 w-5 mr-3" />
        Health Calculators
      </TabsTrigger>
    </TabsList>
  );
}