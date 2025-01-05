import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Hospital } from "@/types/hospital";
import { HospitalProfileDialog } from "./HospitalProfileDialog";

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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const defaultImage = "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=1000&auto=format&fit=crop";

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-white/90 p-6 rounded-lg hover:shadow-lg transition-all duration-300">
        <div className="w-full max-w-[250px] mx-auto">
          <img
            src={hospital.image || defaultImage}
            alt={hospital.name}
            className="w-full h-36 object-cover rounded-lg shadow-md"
          />
        </div>

        <div className="flex flex-col justify-center">
          <h3 className="text-2xl font-semibold text-[#1A1F2C] mb-2">{hospital.name}</h3>
          <p className="text-[#7E69AB]">{hospital.location}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#1A1F2C] font-semibold">Rating:</span>
            <span className="bg-[#9b87f5]/10 text-[#7E69AB] px-2 py-1 rounded-md">
              {hospital.rating}/5
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-[#1A1F2C] mb-3">Specialities</h4>
          <div className="flex flex-wrap gap-2">
            {hospital.specialities.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1.5 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm font-medium"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <Button 
            variant="outline"
            className="bg-white border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 w-full"
            onClick={() => setIsProfileOpen(true)}
          >
            View Hospital Profile
          </Button>
          <Button 
            onClick={() => onRequestCallback(hospital)}
            variant="outline"
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 w-full"
          >
            Request Callback
          </Button>
          <Button 
            onClick={() => onAdmissionEnquiry(hospital)}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white w-full"
          >
            Send Admission Enquiry
          </Button>
        </div>
      </div>

      <HospitalProfileDialog
        hospital={hospital}
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        onRequestCallback={onRequestCallback}
        onAdmissionEnquiry={onAdmissionEnquiry}
      />
    </>
  );
}