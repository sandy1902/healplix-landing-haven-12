import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, MapPin, Star, Clock, IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <Card className="border-0 bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Section 1: Profile Image */}
          <div className="lg:col-span-2 flex justify-center items-start">
            <Avatar className="h-32 w-32 rounded-lg">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
          </div>

          {/* Section 2: Doctor's Details */}
          <div className="lg:col-span-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-[#1A1F2C]">{doctor.name}</h3>
                <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-md">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-yellow-700">{doctor.rating}</span>
                </div>
              </div>
              <p className="text-[#8E9196]">{doctor.qualification}</p>
              <p className="text-[#7E69AB] font-medium">{doctor.specialization}</p>
              <p className="text-[#8E9196] font-medium">{doctor.experience} experience</p>
            </div>
          </div>

          {/* Section 3: Clinic Information */}
          <div className="lg:col-span-3">
            <div className="w-full p-4 bg-[#F8F9FA] rounded-lg">
              <h4 className="font-semibold text-[#1A1F2C] mb-3">{doctor.clinicName}</h4>
              <p className="text-[#8E9196] flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#9b87f5]" /> 
                <span className="flex-1">{doctor.location}</span>
              </p>
            </div>
          </div>

          {/* Section 4: Appointment Details */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-4">
            {doctor.videoConsultation.available && (
              <div className="flex items-center justify-between p-3 bg-[#9b87f5]/10 rounded-lg">
                <Badge variant="outline" className="flex items-center gap-2 border-[#9b87f5]">
                  <Video className="h-4 w-4 text-[#9b87f5]" /> Video Consultation
                </Badge>
                <span className="flex items-center text-[#1A1F2C] font-medium">
                  <IndianRupee className="h-4 w-4" />
                  {doctor.videoConsultation.charges}
                </span>
              </div>
            )}
            {doctor.clinicVisit.available && (
              <div className="flex items-center justify-between p-3 bg-[#7E69AB]/10 rounded-lg">
                <Badge variant="outline" className="flex items-center gap-2 border-[#7E69AB]">
                  <Clock className="h-4 w-4 text-[#7E69AB]" /> Clinic Visit
                </Badge>
                <span className="flex items-center text-[#1A1F2C] font-medium">
                  <IndianRupee className="h-4 w-4" />
                  {doctor.clinicVisit.charges}
                </span>
              </div>
            )}
            <Button 
              className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
              onClick={() => onBookAppointment(doctor)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}