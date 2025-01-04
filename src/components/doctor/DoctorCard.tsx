import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCircle } from "lucide-react";
import { Doctor } from "@/types/doctor";
import { useState } from "react";
import { DoctorProfileDialog } from "./DoctorProfileDialog";
import { DoctorBasicInfo } from "./DoctorBasicInfo";
import { ClinicInfo } from "./ClinicInfo";
import { ConsultationOptions } from "./ConsultationOptions";

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
            <DoctorBasicInfo doctor={doctor} />
            <ClinicInfo doctor={doctor} />

            <div className="flex flex-col gap-3 md:gap-4 w-full">
              <Button 
                variant="outline"
                className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10 text-sm md:text-base py-2"
                onClick={() => setShowProfile(true)}
              >
                <UserCircle className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                View Profile
              </Button>

              <ConsultationOptions doctor={doctor} />
              
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