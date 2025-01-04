import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";
import { GlobalSearchBar } from "@/components/search/GlobalSearchBar";
import { Doctor } from "@/types/doctor";

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
      clinicLocation: "123 Medical Center Drive, Los Angeles, CA 90012",
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
      clinicLocation: "456 Medical Plaza, San Francisco, CA 94108",
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
      <div className="container mx-auto py-12 px-4">
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-3xl font-bold text-[#1A1F2C]">Find a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <GlobalSearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search doctors, locations, specialities, services, clinics..."
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    placeholder="Search by location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20"
                  />
                </div>
                <div>
                  <Select value={speciality} onValueChange={setSpeciality}>
                    <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
                      <SelectValue placeholder="Select Speciality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiologist">Cardiologist</SelectItem>
                      <SelectItem value="dermatologist">Dermatologist</SelectItem>
                      <SelectItem value="neurologist">Neurologist</SelectItem>
                      <SelectItem value="orthopedist">Orthopedist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={handleBookAppointment}
            />
          ))}

          {filteredDoctors.length === 0 && (
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center text-[#8E9196]">
                No doctors found matching your criteria
              </CardContent>
            </Card>
          )}
        </div>
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