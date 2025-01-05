import { Card, CardContent } from "@/components/ui/card";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { Doctor } from "@/types/doctor";

interface SearchResultsProps {
  doctors: Doctor[];
  onBookAppointment: (doctor: Doctor) => void;
}

export function SearchResults({ doctors, onBookAppointment }: SearchResultsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {doctors.length > 0 ? (
        doctors.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={onBookAppointment}
          />
        ))
      ) : (
        <Card className="col-span-full border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6 text-center text-[#8E9196]">
            No doctors found matching your criteria
          </CardContent>
        </Card>
      )}
    </div>
  );
}