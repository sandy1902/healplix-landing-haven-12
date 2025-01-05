import { Clock, History, FileText, UserCog, Users, Heart, Calculator, Stethoscope } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <TabsList className="w-full justify-start overflow-x-auto bg-white py-8 px-4 rounded-lg mb-4">
      <TabsTrigger 
        value="appointments" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <Clock className="h-5 w-5" />
        Appointments
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <History className="h-5 w-5" />
        History
      </TabsTrigger>
      <TabsTrigger 
        value="records" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <FileText className="h-5 w-5" />
        Medical Records
      </TabsTrigger>
      <TabsTrigger 
        value="medical-history" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <Stethoscope className="h-5 w-5" />
        Medical History
      </TabsTrigger>
      <TabsTrigger 
        value="dependents" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <Users className="h-5 w-5" />
        Dependents
      </TabsTrigger>
      <TabsTrigger 
        value="favorites" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <Heart className="h-5 w-5" />
        Favorites
      </TabsTrigger>
      <TabsTrigger 
        value="profile" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <UserCog className="h-5 w-5" />
        Profile Settings
      </TabsTrigger>
      <TabsTrigger 
        value="calculators" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white text-lg py-3"
      >
        <Calculator className="h-5 w-5" />
        Health Calculators
      </TabsTrigger>
    </TabsList>
  );
}