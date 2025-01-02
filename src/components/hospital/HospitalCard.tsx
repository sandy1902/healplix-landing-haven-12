import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";

interface HospitalCardProps {
  hospital: Hospital;
  onRequestCallback: (hospital: Hospital) => void;
  onAdmissionEnquiry: (hospital: Hospital) => void;
}

export function HospitalCard({ 
  hospital, 
  onRequestCallback, 
  onAdmissionEnquiry 
}: HospitalCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Section 1: Image */}
      <div className="w-full">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>

      {/* Section 2: Hospital Details */}
      <div className="flex flex-col justify-center">
        <h3 className="text-2xl font-semibold text-[#1A1F2C] mb-2">{hospital.name}</h3>
        <p className="text-[#8E9196]">{hospital.location}</p>
        <span className="text-[#1A1F2C] font-semibold mt-2">Rating: {hospital.rating}/5</span>
      </div>

      {/* Section 3: Specialities */}
      <div>
        <h4 className="text-lg font-semibold text-[#1A1F2C] mb-3">Specialities</h4>
        <div className="flex flex-col gap-2">
          {hospital.specialities.map((spec) => (
            <span
              key={spec}
              className="px-3 py-1.5 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm font-medium w-fit"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>

      {/* Section 4: Action Buttons */}
      <div className="flex flex-col gap-3 justify-center">
        <Button 
          onClick={() => onRequestCallback(hospital)}
          variant="outline"
          className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 w-full"
        >
          Request Callback
        </Button>
        <Button 
          onClick={() => onAdmissionEnquiry(hospital)}
          className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white w-full"
        >
          Send Admission Enquiry
        </Button>
      </div>
    </div>
  );
}