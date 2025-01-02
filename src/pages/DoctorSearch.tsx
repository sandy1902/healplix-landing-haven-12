import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { DoctorCard } from "@/components/doctor/DoctorCard";
import { Doctor } from "@/types/doctor";

export default function DoctorSearch() {
  const { toast } = useToast();
  const [location, setLocation] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  
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
    toast({
      title: "Booking Initiated",
      description: `Initiating booking process with ${doctor.name}`,
    });
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesLocation = !location || doctor.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || doctor.specialization.toLowerCase() === speciality.toLowerCase();
    return matchesLocation && matchesSpeciality;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <div className="container mx-auto py-12 px-4">
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#1A1F2C]">Find a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-primary">Welcome to Healplix</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Healplix connects you with the best healthcare professionals in your area. Our platform makes it easy to find specialists, book appointments, and manage your healthcare journey. Whether you need a routine check-up or specialized care, we're here to help you find the right doctor.
              </p>
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
    </div>
  );
}