import { MapPin } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface ClinicInfoProps {
  doctor: Doctor;
}

export function ClinicInfo({ doctor }: ClinicInfoProps) {
  return (
    <div className="w-full p-3 md:p-4 bg-[#9b87f5]/5 rounded-lg">
      <h4 className="font-semibold text-sm md:text-base text-[#1A1F2C] mb-2 md:mb-3 text-center md:text-left">
        {doctor.clinicName}
      </h4>
      <p className="text-sm md:text-base text-[#7E69AB] flex items-center gap-2 justify-center md:justify-start">
        <MapPin className="h-3 w-3 md:h-4 md:w-4 text-[#9b87f5]" /> 
        <span className="flex-1">{doctor.location}</span>
      </p>
    </div>
  );
}