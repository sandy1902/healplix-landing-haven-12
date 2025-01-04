import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";

interface DoctorsListProps {
  doctors: Array<{ name: string; qualification: string; speciality: string; }>;
}

export function DoctorsList({ doctors }: DoctorsListProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const handleBookAppointment = (doctor: any) => {
    // Convert hospital doctor format to Doctor type
    const formattedDoctor: Doctor = {
      id: doctor.name.toLowerCase().replace(/\s+/g, '-'),
      name: doctor.name,
      speciality: doctor.speciality,
      qualification: doctor.qualification,
      experience: "5+ years",
      rating: 4.5,
      clinicName: "Main Hospital Clinic",
      location: "Hospital Location",
      clinicVisit: { 
        charges: 500,
        available: true 
      },
      videoConsultation: { 
        charges: 400,
        available: true 
      },
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      about: `Dr. ${doctor.name} is a highly qualified ${doctor.speciality} specialist.`
    };
    
    setSelectedDoctor(formattedDoctor);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Our Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white/50 backdrop-blur-sm">
            <h4 className="font-semibold">{doctor.name}</h4>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>
            <p className="text-sm text-gray-600 mb-3">{doctor.speciality}</p>
            <Button 
              onClick={() => handleBookAppointment(doctor)}
              className="w-full bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
            >
              Book Appointment
            </Button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <AppointmentDialog
          doctor={selectedDoctor}
          open={isAppointmentOpen}
          onOpenChange={setIsAppointmentOpen}
        />
      )}
    </div>
  );
}