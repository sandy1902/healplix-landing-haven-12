import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GlobalSearchBar } from "./GlobalSearchBar";

interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  speciality: string;
  setSpeciality: (value: string) => void;
}

export function SearchHeader({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  speciality,
  setSpeciality,
}: SearchHeaderProps) {
  return (
    <Card className="mb-6 md:mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="text-center pb-2 pt-12 md:pt-16">
        <CardTitle className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">Find a Doctor</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <GlobalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search doctors, specialities, services..."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <SelectItem value="cardiologist">Cardiologist</SelectItem>
                <SelectItem value="dermatologist">Dermatologist</SelectItem>
                <SelectItem value="neurologist">Neurologist</SelectItem>
                <SelectItem value="orthopedist">Orthopedist</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}