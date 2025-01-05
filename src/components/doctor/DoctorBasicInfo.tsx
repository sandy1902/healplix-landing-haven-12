import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Doctor } from "@/types/doctor";

interface DoctorBasicInfoProps {
  doctor: Doctor;
}

export function DoctorBasicInfo({ doctor }: DoctorBasicInfoProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
      <Avatar className="h-20 w-20 md:h-32 md:w-32 rounded-lg">
        <AvatarFallback className="text-lg">
          {doctor.name.split(' ').map(n => n[0]).join('')}
        </AvatarFallback>
      </Avatar>
      
      <div className="text-center md:text-left flex-1">
        <div className="space-y-1.5 md:space-y-2">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
            <h3 className="text-lg md:text-2xl font-bold text-[#1A1F2C]">{doctor.name}</h3>
            <div className="flex items-center gap-1 bg-[#9b87f5]/10 px-2 py-1 rounded-md">
              <Star className="h-3 w-3 md:h-4 md:w-4 text-[#9b87f5] fill-[#9b87f5]" />
              <span className="text-xs md:text-sm font-medium text-[#7E69AB]">{doctor.rating}</span>
            </div>
          </div>
          <p className="text-sm md:text-base text-[#7E69AB]">{doctor.qualification}</p>
          <p className="text-sm md:text-base text-[#9b87f5] font-medium">{doctor.specialization}</p>
          <p className="text-sm md:text-base text-[#7E69AB] font-medium">{doctor.experience} experience</p>
        </div>
      </div>
    </div>
  );
}