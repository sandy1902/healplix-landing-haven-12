import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";
import { DoctorProfileDialog } from "@/components/doctor/DoctorProfileDialog";

interface DoctorsListProps {
  doctors: Array<{ name: string; qualification: string; speciality: string; }>;
}

export function DoctorsList({ doctors }: DoctorsListProps) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleBookAppointment = (doctor: any) => {
    const formattedDoctor: Doctor = {
      id: doctor.name.toLowerCase().replace(/\s+/g, '-'),
      name: doctor.name,
      specialization: doctor.speciality,
      qualification: doctor.qualification,
      experience: "5+ years",
      rating: 4.5,
      clinicName: "Main Hospital Clinic",
      location: window.location.pathname === "/search-hospitals" ? "Hospital Location" : "Private Clinic",
      clinicVisit: { 
        charges: 500,
        available: true 
      },
      videoConsultation: { 
        charges: 400,
        available: true 
      },
      email: "doctor@hospital.com",
      contactNumber: "+1234567890",
      clinicLocation: window.location.pathname === "/search-hospitals" ? "Hospital Location" : "Private Clinic",
      clinicTimings: "9:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    };
    
    setSelectedDoctor(formattedDoctor);
    setIsAppointmentOpen(true);
  };

  const handleViewProfile = (doctor: any) => {
    const formattedDoctor: Doctor = {
      id: doctor.name.toLowerCase().replace(/\s+/g, '-'),
      name: doctor.name,
      specialization: doctor.speciality,
      qualification: doctor.qualification,
      experience: "5+ years",
      rating: 4.5,
      clinicName: "Main Hospital Clinic",
      location: window.location.pathname === "/search-hospitals" ? "Hospital Location" : "Private Clinic",
      clinicVisit: { 
        charges: 500,
        available: true 
      },
      videoConsultation: { 
        charges: 400,
        available: true 
      },
      email: "doctor@hospital.com",
      contactNumber: "+1234567890",
      clinicLocation: window.location.pathname === "/search-hospitals" ? "Hospital Location" : "Private Clinic",
      clinicTimings: "9:00 AM - 5:00 PM",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
    };
    
    setSelectedDoctor(formattedDoctor);
    setIsProfileOpen(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">Our Doctors</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {doctors.map((doctor, index) => (
          <div key={index} className="p-6 border rounded-lg bg-white/50 backdrop-blur-sm shadow-sm">
            <h4 className="font-semibold text-lg">{doctor.name}</h4>
            <p className="text-sm text-gray-600">{doctor.qualification}</p>
            <p className="text-sm text-gray-600 mb-4">{doctor.speciality}</p>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => handleViewProfile(doctor)}
                className="flex-1 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
              >
                View Profile
              </Button>
              <Button 
                onClick={() => handleBookAppointment(doctor)}
                className="flex-1 bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <>
          <AppointmentDialog
            doctor={selectedDoctor}
            open={isAppointmentOpen}
            onOpenChange={setIsAppointmentOpen}
          />
          <DoctorProfileDialog
            doctor={selectedDoctor}
            open={isProfileOpen}
            onOpenChange={setIsProfileOpen}
          />
        </>
      )}
    </div>
  );
}