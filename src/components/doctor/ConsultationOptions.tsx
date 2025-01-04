import { Video, Clock, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Doctor } from "@/types/doctor";

interface ConsultationOptionsProps {
  doctor: Doctor;
}

export function ConsultationOptions({ doctor }: ConsultationOptionsProps) {
  return (
    <>
      {doctor.videoConsultation.available && (
        <div className="flex flex-col md:flex-row items-center justify-between p-2.5 md:p-3 bg-[#9b87f5]/10 rounded-lg gap-2">
          <Badge variant="outline" className="flex items-center gap-2 border-[#9b87f5] text-xs md:text-sm">
            <Video className="h-3 w-3 md:h-4 md:w-4 text-[#9b87f5]" /> Video Consultation
          </Badge>
          <span className="flex items-center text-sm md:text-base text-[#1A1F2C] font-medium">
            <IndianRupee className="h-3 w-3 md:h-4 md:w-4" />
            {doctor.videoConsultation.charges}
          </span>
        </div>
      )}
      
      {doctor.clinicVisit.available && (
        <div className="flex flex-col md:flex-row items-center justify-between p-2.5 md:p-3 bg-[#7E69AB]/10 rounded-lg gap-2">
          <Badge variant="outline" className="flex items-center gap-2 border-[#7E69AB] text-xs md:text-sm">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-[#7E69AB]" /> Clinic Visit
          </Badge>
          <span className="flex items-center text-sm md:text-base text-[#1A1F2C] font-medium">
            <IndianRupee className="h-3 w-3 md:h-4 md:w-4" />
            {doctor.clinicVisit.charges}
          </span>
        </div>
      )}
    </>
  );
}