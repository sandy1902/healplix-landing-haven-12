import { Clock, History, FileText, UserCog, Users, Heart } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  return (
    <TabsList className="w-full justify-start overflow-x-auto bg-white py-6 px-4 rounded-lg mb-4">
      <TabsTrigger 
        value="appointments" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <Clock className="h-4 w-4" />
        Appointments
      </TabsTrigger>
      <TabsTrigger 
        value="history" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <History className="h-4 w-4" />
        History
      </TabsTrigger>
      <TabsTrigger 
        value="records" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <FileText className="h-4 w-4" />
        Medical Records
      </TabsTrigger>
      <TabsTrigger 
        value="dependents" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <Users className="h-4 w-4" />
        Dependents
      </TabsTrigger>
      <TabsTrigger 
        value="favorites" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <Heart className="h-4 w-4" />
        Favorites
      </TabsTrigger>
      <TabsTrigger 
        value="profile" 
        className="flex items-center gap-2 data-[state=active]:bg-secondary data-[state=active]:text-white"
      >
        <UserCog className="h-4 w-4" />
        Profile Settings
      </TabsTrigger>
    </TabsList>
  );
}