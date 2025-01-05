import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";
import { Doctor } from "@/types/doctor";
import { Navbar } from "@/components/Navbar";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";

export default function DoctorSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [doctors] = useState<Doctor[]>([
    {
      id: "1",
      name: "Dr. Sarah Wilson",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      qualification: "MBBS, MD - Cardiology",
      specialization: "Cardiologist",
      experience: "15 years",
      clinicName: "Heart Care Clinic",
      location: "Los Angeles, CA",
      rating: 4.8,
      email: "sarah.wilson@heartcare.com",
      contactNumber: "+1 (555) 123-4567",
      clinicLocation: "123 Medical Center Drive, Los Angeles, CA",
      clinicTimings: "Mon-Fri: 9:00 AM - 5:00 PM",
      videoConsultation: {
        available: true,
        charges: 1000
      },
      clinicVisit: {
        available: true,
        charges: 1500
      }
    },
    {
      id: "2",
      name: "Dr. Michael Chen",
      image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
      qualification: "MBBS, MD - Dermatology",
      specialization: "Dermatologist",
      experience: "12 years",
      clinicName: "Skin Care Center",
      location: "San Francisco, CA",
      rating: 4.5,
      email: "michael.chen@skincare.com",
      contactNumber: "+1 (555) 987-6543",
      clinicLocation: "456 Medical Plaza, San Francisco, CA",
      clinicTimings: "Mon-Sat: 10:00 AM - 6:00 PM",
      videoConsultation: {
        available: true,
        charges: 800
      },
      clinicVisit: {
        available: true,
        charges: 1200
      }
    }
  ]);

  const handleBookAppointment = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  const filteredDoctors = doctors.filter(doctor => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchQuery === "" || searchTerms.every(term =>
      doctor.name.toLowerCase().includes(term) ||
      doctor.location.toLowerCase().includes(term) ||
      doctor.specialization.toLowerCase().includes(term) ||
      doctor.qualification.toLowerCase().includes(term) ||
      doctor.clinicName.toLowerCase().includes(term) ||
      (doctor.services && doctor.services.some(service => 
        service.toLowerCase().includes(term)
      ))
    );

    const matchesLocation = !location || doctor.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || doctor.specialization.toLowerCase() === speciality.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesSpeciality;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-32">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          speciality={speciality}
          setSpeciality={setSpeciality}
        />
        
        <SearchResults 
          doctors={filteredDoctors}
          onBookAppointment={handleBookAppointment}
        />
      </div>

      {selectedDoctor && (
        <AppointmentDialog
          doctor={selectedDoctor}
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
        />
      )}
    </div>
  );
}
