import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

export const DashboardMenu = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button 
        variant="ghost" 
        className="flex items-center gap-2 hover:text-primary font-poppins capitalize text-lg"
      >
        <LayoutDashboard className="h-5 w-5" />
        Dashboards
      </Button>
      
      {isHovered && (
        <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg p-2 z-50">
          <Link 
            to="/dashboard" 
            className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
          >
            Subscriber Dashboard
          </Link>
          <Link 
            to="/doctor-dashboard" 
            className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
          >
            Doctor Dashboard
          </Link>
          <Link 
            to="/executive-dashboard" 
            className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
          >
            Executive Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};