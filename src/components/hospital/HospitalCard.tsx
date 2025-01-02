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
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4">
        <img
          src={hospital.image}
          alt={hospital.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-2xl font-semibold text-[#1A1F2C] mb-2">{hospital.name}</h3>
        <p className="text-[#8E9196] mb-4">{hospital.location}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold text-[#1A1F2C] mb-2">Specialities</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.specialities.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-[#1A1F2C] mb-2">Insurance Providers</h4>
            <div className="flex flex-wrap gap-2">
              {hospital.insuranceProviders.map((provider) => (
                <span
                  key={provider}
                  className="px-3 py-1 bg-[#F2FCE2] text-[#1A1F2C] rounded-full text-sm"
                >
                  {provider}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#1A1F2C] font-semibold">Rating: {hospital.rating}/5</span>
          <div className="space-x-4">
            <Button 
              onClick={() => onRequestCallback(hospital)}
              variant="outline"
              className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
            >
              Request Callback
            </Button>
            <Button 
              onClick={() => onAdmissionEnquiry(hospital)}
              className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
            >
              Send Admission Enquiry
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}