import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Video, MapPin, Star, Clock, IndianRupee } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
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
    <div className="min-h-screen bg-accent">
      <div className="container mx-auto py-8 px-4">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Find a Doctor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder="Search by location..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full"
                />
              </div>
              <div>
                <Select value={speciality} onValueChange={setSpeciality}>
                  <SelectTrigger>
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

        <div className="space-y-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-gray-600">{doctor.qualification}</p>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                  </div>

                  <div className="space-y-2">
                    <p className="font-medium">{doctor.clinicName}</p>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="h-4 w-4" /> {doctor.location}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>{doctor.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      {doctor.videoConsultation.available && (
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Video className="h-4 w-4" /> Video Consultation
                          </Badge>
                          <span className="flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {doctor.videoConsultation.charges}
                          </span>
                        </div>
                      )}
                      {doctor.clinicVisit.available && (
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-4 w-4" /> Clinic Visit
                          </Badge>
                          <span className="flex items-center">
                            <IndianRupee className="h-4 w-4" />
                            {doctor.clinicVisit.charges}
                          </span>
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full"
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
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                No doctors found matching your criteria
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}