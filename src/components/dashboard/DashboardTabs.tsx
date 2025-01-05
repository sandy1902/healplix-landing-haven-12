import { useState } from "react";
import { Clock, History, FileText, UserCog, Users, Heart, Calculator, ChevronDown, ChevronUp } from "lucide-react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export function DashboardTabs() {
  const [showCalculators, setShowCalculators] = useState(false);

  const toggleCalculators = () => {
    setShowCalculators(!showCalculators);
  };

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
      <div className="relative">
        <button
          onClick={toggleCalculators}
          className="flex items-center gap-2 px-4 py-3 text-lg hover:bg-gray-100 rounded-md transition-colors"
        >
          <Calculator className="h-5 w-5" />
          Health Calculators
          {showCalculators ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {showCalculators && (
          <div className="absolute left-0 mt-1 w-48 bg-white shadow-lg rounded-md overflow-hidden z-10">
            <TabsTrigger 
              value="bmi" 
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              BMI Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="pregnancy" 
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Pregnancy Calculator
            </TabsTrigger>
            <TabsTrigger 
              value="safe-period" 
              className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              Safe Period Calculator
            </TabsTrigger>
          </div>
        )}
      </div>
    </TabsList>
  );
}