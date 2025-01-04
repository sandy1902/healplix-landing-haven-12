import { MapPin } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface ClinicInfoProps {
  doctor: Doctor;
}

export function ClinicInfo({ doctor }: ClinicInfoProps) {
  return (
    <div className="w-full p-3 md:p-4 bg-[#9b87f5]/5 rounded-lg">
      <h4 className="font-semibold text-sm md:text-base text-[#1A1F2C] mb-2 md:mb-3">
        {doctor.clinicName}
      </h4>
      <div className="flex items-start gap-1">
        <MapPin className="h-3 w-3 md:h-4 md:w-4 text-[#9b87f5] mt-0.5" />
        <div className="flex-1 text-sm md:text-base text-[#7E69AB]">
          <p>{doctor.location}</p>
          <p>{doctor.clinicLocation}</p>
        </div>
      </div>
    </div>
  );
}