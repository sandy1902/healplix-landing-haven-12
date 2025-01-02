import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AdmissionEnquiryForm } from "@/components/hospital/AdmissionEnquiryForm";
import { HospitalCard } from "@/components/hospital/HospitalCard";
import { Hospital } from "@/types/hospital";

export default function HospitalSearch() {
  const [location, setLocation] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const [insuranceProvider, setInsuranceProvider] = useState<string>("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [isEnquiryFormOpen, setIsEnquiryFormOpen] = useState(false);
  const { toast } = useToast();

  const [hospitals] = useState<Hospital[]>([
    {
      id: "1",
      name: "General Hospital",
      image: "https://images.unsplash.com/photo-1587351021355-a479a299d2f9",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514"
      ],
      location: "Los Angeles, CA",
      specialities: ["Cardiology", "Neurology", "Orthopedics"],
      insuranceProviders: ["Blue Cross", "Aetna", "United Healthcare"],
      rating: 4.8,
      doctors: [
        {
          name: "Dr. John Smith",
          qualification: "MD, FACC",
          speciality: "Cardiology"
        },
        {
          name: "Dr. Sarah Johnson",
          qualification: "MD, FAAN",
          speciality: "Neurology"
        },
        {
          name: "Dr. Michael Brown",
          qualification: "MD, FAAOS",
          speciality: "Orthopedics"
        }
      ]
    },
    {
      id: "2",
      name: "City Medical Center",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
      images: [
        "https://images.unsplash.com/photo-1587351021355-a479a299d2f9",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514"
      ],
      location: "San Francisco, CA",
      specialities: ["Pediatrics", "Oncology", "Dermatology"],
      insuranceProviders: ["Kaiser", "Cigna", "Blue Shield"],
      rating: 4.5,
      doctors: [
        {
          name: "Dr. Emily Davis",
          qualification: "MD, FAAP",
          speciality: "Pediatrics"
        },
        {
          name: "Dr. Robert Wilson",
          qualification: "MD, FASCO",
          speciality: "Oncology"
        },
        {
          name: "Dr. Lisa Chen",
          qualification: "MD, FAAD",
          speciality: "Dermatology"
        }
      ]
    }
  ]);

  const handleAdmissionEnquiry = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsEnquiryFormOpen(true);
  };

  const handleRequestCallback = (hospital: Hospital) => {
    toast({
      title: "Callback Requested",
      description: "We will contact you shortly regarding your inquiry.",
    });
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesLocation = !location || hospital.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || hospital.specialities.includes(speciality);
    const matchesInsurance = !insuranceProvider || hospital.insuranceProviders.includes(insuranceProvider);
    return matchesLocation && matchesSpeciality && matchesInsurance;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <div className="container mx-auto py-12 px-4">
        <Card className="mb-8 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-[#1A1F2C]">Find a Hospital</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                    <SelectItem value="Cardiology">Cardiology</SelectItem>
                    <SelectItem value="Neurology">Neurology</SelectItem>
                    <SelectItem value="Orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="Pediatrics">Pediatrics</SelectItem>
                    <SelectItem value="Oncology">Oncology</SelectItem>
                    <SelectItem value="Dermatology">Dermatology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                  <SelectTrigger className="w-full border-[#9b87f5]/30 focus:border-[#9b87f5] focus:ring-[#9b87f5]/20">
                    <SelectValue placeholder="Select Insurance Provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blue Cross">Blue Cross</SelectItem>
                    <SelectItem value="Aetna">Aetna</SelectItem>
                    <SelectItem value="United Healthcare">United Healthcare</SelectItem>
                    <SelectItem value="Kaiser">Kaiser</SelectItem>
                    <SelectItem value="Cigna">Cigna</SelectItem>
                    <SelectItem value="Blue Shield">Blue Shield</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {filteredHospitals.map((hospital) => (
            <Card key={hospital.id} className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <HospitalCard
                  hospital={hospital}
                  onRequestCallback={handleRequestCallback}
                  onAdmissionEnquiry={handleAdmissionEnquiry}
                />
              </CardContent>
            </Card>
          ))}

          {filteredHospitals.length === 0 && (
            <Card className="border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center text-[#8E9196]">
                No hospitals found matching your criteria
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {selectedHospital && (
        <AdmissionEnquiryForm
          open={isEnquiryFormOpen}
          onOpenChange={setIsEnquiryFormOpen}
          hospitalName={selectedHospital.name}
          insuranceProviders={selectedHospital.insuranceProviders}
        />
      )}
    </div>
  );
}
