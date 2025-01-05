import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  speciality: string;
  setSpeciality: (value: string) => void;
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  speciality,
  setSpeciality,
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Search hospitals by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
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
            <SelectItem value="general-medicine">General Medicine</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
            <SelectItem value="orthopedics">Orthopedics</SelectItem>
            <SelectItem value="gynecology">Gynecology</SelectItem>
            <SelectItem value="dermatology">Dermatology</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}