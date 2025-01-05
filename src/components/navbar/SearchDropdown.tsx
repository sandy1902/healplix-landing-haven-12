import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchDropdown = () => {
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
        <Search className="h-5 w-5" />
        Search
      </Button>
      
      {isHovered && (
        <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
          <Link 
            to="/search-doctors" 
            className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
          >
            Find a Doctor
          </Link>
          <Link 
            to="/search-hospitals" 
            className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
          >
            Find a Hospital
          </Link>
        </div>
      )}
    </div>
  );
};