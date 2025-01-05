import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  speciality: string;
  setSpeciality: (value: string) => void;
  insuranceProvider: string;
  setInsuranceProvider: (value: string) => void;
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  speciality,
  setSpeciality,
  insuranceProvider,
  setInsuranceProvider,
}: SearchFiltersProps) {
  const [insuranceProviders, setInsuranceProviders] = useState<Array<{ id: string; name: string }>>([]);

  useEffect(() => {
    async function fetchInsuranceProviders() {
      const { data, error } = await supabase
        .from('insurance_providers')
        .select('id, name');
      
      if (!error && data) {
        setInsuranceProviders(data);
      }
    }

    fetchInsuranceProviders();
  }, []);

  const handleReset = () => {
    setSearchQuery("");
    setLocation("");
    setSpeciality("");
    setInsuranceProvider("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Search hospitals by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleReset}
          className="shrink-0"
          title="Reset filters"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
        />
        <Select value={speciality} onValueChange={setSpeciality}>
          <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
            <SelectValue placeholder="Select Speciality" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general-medicine">General Medicine</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="gynecology">Gynecology</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
          </SelectContent>
        </Select>
        <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
          <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
            <SelectValue placeholder="Select Insurance Provider" />
          </SelectTrigger>
          <SelectContent>
            {insuranceProviders.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}