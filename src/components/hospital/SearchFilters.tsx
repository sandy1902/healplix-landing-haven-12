import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlobalSearchBar } from "@/components/search/GlobalSearchBar";

interface SearchFiltersProps {
  location: string;
  setLocation: (value: string) => void;
  speciality: string;
  setSpeciality: (value: string) => void;
  insuranceProvider: string;
  setInsuranceProvider: (value: string) => void;
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const SearchFilters = ({
  location,
  setLocation,
  speciality,
  setSpeciality,
  insuranceProvider,
  setInsuranceProvider,
  searchQuery,
  setSearchQuery,
}: SearchFiltersProps) => {
  return (
    <Card className="mb-4 md:mb-8 shadow-lg border-0 bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5 backdrop-blur-sm">
      <CardHeader className="text-center pb-2 px-4">
        <CardTitle className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">Find a Hospital</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <GlobalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search hospitals, specialities..."
          />
          <div className="flex flex-col space-y-4">
            <div className="w-full">
              <Input
                placeholder="Search by location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
              />
            </div>
            <div className="w-full">
              <Select value={speciality} onValueChange={setSpeciality}>
                <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
                  <SelectValue placeholder="Select Speciality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cardiology">Cardiology</SelectItem>
                  <SelectItem value="Neurology">Neurology</SelectItem>
                  <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="Oncology">Oncology</SelectItem>
                  <SelectItem value="Dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
                  <SelectValue placeholder="Select Insurance Provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                  <SelectItem value="Aetna">Aetna</SelectItem>
                  <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                  <SelectItem value="Kaiser">Kaiser</SelectItem>
                  <SelectItem value="Cigna">Cigna</SelectItem>
                  <SelectItem value="Blue Shield">Blue Shield</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};