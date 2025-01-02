import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Video, MapPin, Star, Clock, IndianRupee } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Doctor {
  id: string;
  name: string;
  image: string;
  qualification: string;
  specialization: string;
  experience: string;
  clinicName: string;
  location: string;
  rating: number;
  videoConsultation: {
    available: boolean;
    charges: number;
  };
  clinicVisit: {
    available: boolean;
    charges: number;
  };
}

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

        <div className="space-y-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-xl transition-shadow duration-300 border-0 bg-white/90 backdrop-blur-sm animate-fade-up">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={doctor.image} alt={doctor.name} />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[#1A1F2C]">{doctor.name}</h3>
                      <p className="text-[#8E9196]">{doctor.qualification}</p>
                      <p className="text-[#7E69AB] font-medium">{doctor.specialization}</p>
                      <p className="text-[#8E9196] font-medium">{doctor.experience} experience</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="font-semibold text-[#1A1F2C]">{doctor.clinicName}</p>
                    <p className="text-[#8E9196] flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#9b87f5]" /> {doctor.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
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
                    </div>
                  </div>

                  <div className="flex items-center justify-end">
                    <Button 
                      className="w-full md:w-auto bg-[#9b87f5] hover:bg-[#7E69AB] text-white transition-colors"
                      onClick={() => handleBookAppointment(doctor)}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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