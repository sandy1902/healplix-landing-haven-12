import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AdmissionEnquiryForm } from "@/components/hospital/AdmissionEnquiryForm";

interface Hospital {
  id: string;
  name: string;
  image: string;
  location: string;
  specialities: string[];
  insuranceProviders: string[];
  rating: number;
}

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
      location: "Los Angeles, CA",
      specialities: ["Cardiology", "Neurology", "Orthopedics"],
      insuranceProviders: ["Blue Cross", "Aetna", "United Healthcare"],
      rating: 4.8
    },
    {
      id: "2",
      name: "City Medical Center",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3",
      location: "San Francisco, CA",
      specialities: ["Pediatrics", "Oncology", "Dermatology"],
      insuranceProviders: ["Kaiser", "Cigna", "Blue Shield"],
      rating: 4.5
    }
  ]);

  const handleAdmissionEnquiry = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setIsEnquiryFormOpen(true);
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
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/4">
                    <img
                      src={hospital.image}
                      alt={hospital.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-[#1A1F2C] mb-2">{hospital.name}</h3>
                    <p className="text-[#8E9196] mb-4">{hospital.location}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-semibold text-[#1A1F2C] mb-2">Specialities</h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.specialities.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 bg-[#9b87f5]/10 text-[#9b87f5] rounded-full text-sm"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1A1F2C] mb-2">Insurance Providers</h4>
                        <div className="flex flex-wrap gap-2">
                          {hospital.insuranceProviders.map((provider) => (
                            <span
                              key={provider}
                              className="px-3 py-1 bg-[#F2FCE2] text-[#1A1F2C] rounded-full text-sm"
                            >
                              {provider}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#1A1F2C] font-semibold">Rating: {hospital.rating}/5</span>
                      <Button 
                        onClick={() => handleAdmissionEnquiry(hospital)}
                        className="bg-[#9b87f5] hover:bg-[#8b77e5] text-white"
                      >
                        Send Admission Enquiry
                      </Button>
                    </div>
                  </div>
                </div>
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
