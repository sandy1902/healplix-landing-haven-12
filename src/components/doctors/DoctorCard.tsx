import { Card, CardContent } from "@/components/ui/card";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
  index: number;
}

export const DoctorCard = ({ doctor, index }: DoctorCardProps) => {
  return (
    <Card 
      className="border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 animate-fade-up mx-2"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img 
            src={doctor.image} 
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="font-bold text-lg text-[#1A1F2C] mb-2">{doctor.name}</h3>
        <p className="text-[#7E69AB] text-sm mb-1">{doctor.qualification}</p>
        <p className="text-[#9b87f5] text-sm font-medium">{doctor.speciality}</p>
      </CardContent>
    </Card>
  );
};