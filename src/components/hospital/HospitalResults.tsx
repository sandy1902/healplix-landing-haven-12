import { Card, CardContent } from "@/components/ui/card";
import { Hospital } from "@/types/hospital";
import { HospitalCard } from "./HospitalCard";

interface HospitalResultsProps {
  hospitals: Hospital[];
  onRequestCallback: (hospital: Hospital) => void;
  onAdmissionEnquiry: (hospital: Hospital) => void;
}

export const HospitalResults = ({
  hospitals,
  onRequestCallback,
  onAdmissionEnquiry,
}: HospitalResultsProps) => {
  return (
    <div className="space-y-6">
      {hospitals.map((hospital) => (
        <Card key={hospital.id} className="border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <HospitalCard
              hospital={hospital}
              onRequestCallback={onRequestCallback}
              onAdmissionEnquiry={onAdmissionEnquiry}
            />
          </CardContent>
        </Card>
      ))}

      {hospitals.length === 0 && (
        <Card className="border-0 bg-white/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center text-[#8E9196]">
            No hospitals found matching your criteria
          </CardContent>
        </Card>
      )}
    </div>
  );
};