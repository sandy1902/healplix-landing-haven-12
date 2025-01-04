import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, MapPin, Star, Clock, IndianRupee, UserCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Doctor } from "@/types/doctor";
import { useState } from "react";
import { DoctorProfileDialog } from "./DoctorProfileDialog";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      <Card className="w-full border-0 bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
        <CardContent className="p-3 md:p-4">
          <div className="flex flex-col gap-3 md:gap-4">
            {/* Doctor Image and Basic Info */}
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
              <Avatar className="h-20 w-20 md:h-32 md:w-32 rounded-lg">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>DR</AvatarFallback>
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

            {/* Clinic Info */}
            <div className="w-full p-3 md:p-4 bg-[#9b87f5]/5 rounded-lg">
              <h4 className="font-semibold text-sm md:text-base text-[#1A1F2C] mb-2 md:mb-3 text-center md:text-left">
                {doctor.clinicName}
              </h4>
              <p className="text-sm md:text-base text-[#7E69AB] flex items-center gap-2 justify-center md:justify-start">
                <MapPin className="h-3 w-3 md:h-4 md:w-4 text-[#9b87f5]" /> 
                <span className="flex-1">{doctor.location}</span>
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 md:gap-4 w-full">
              <Button 
                variant="outline"
                className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 text-sm md:text-base py-2"
                onClick={() => setShowProfile(true)}
              >
                <UserCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                View Profile
              </Button>

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
              
              <Button 
                className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors text-sm md:text-base py-2"
                onClick={() => onBookAppointment(doctor)}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <DoctorProfileDialog
        doctor={doctor}
        open={showProfile}
        onOpenChange={setShowProfile}
      />
    </>
  );
}