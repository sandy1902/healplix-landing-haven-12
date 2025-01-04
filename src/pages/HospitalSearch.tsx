import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AdmissionEnquiryForm } from "@/components/hospital/AdmissionEnquiryForm";
import { SearchFilters } from "@/components/hospital/SearchFilters";
import { HospitalResults } from "@/components/hospital/HospitalResults";
import { GlobalSearchBar } from "@/components/search/GlobalSearchBar";
import { Hospital } from "@/types/hospital";

export default function HospitalSearch() {
  const [searchQuery, setSearchQuery] = useState<string>("");
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
      ],
      reviews: [
        {
          id: "r1",
          userName: "John Doe",
          rating: 5,
          comment: "Excellent care and professional staff",
          date: "2024-03-15"
        },
        {
          id: "r2",
          userName: "Jane Smith",
          rating: 4,
          comment: "Great experience overall, but waiting times could be improved",
          date: "2024-03-10"
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
      ],
      reviews: [
        {
          id: "r3",
          userName: "Michael Johnson",
          rating: 5,
          comment: "Outstanding pediatric care",
          date: "2024-03-12"
        },
        {
          id: "r4",
          userName: "Sarah Williams",
          rating: 4,
          comment: "Very professional staff and clean facility",
          date: "2024-03-08"
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
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchQuery === "" || searchTerms.every(term =>
      hospital.name.toLowerCase().includes(term) ||
      hospital.location.toLowerCase().includes(term) ||
      hospital.specialities.some(spec => spec.toLowerCase().includes(term)) ||
      hospital.doctors.some(doc => 
        doc.name.toLowerCase().includes(term) || 
        doc.speciality.toLowerCase().includes(term)
      )
    );
    
    const matchesLocation = !location || hospital.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || hospital.specialities.includes(speciality);
    const matchesInsurance = !insuranceProvider || hospital.insuranceProviders.includes(insuranceProvider);
    
    return matchesSearch && matchesLocation && matchesSpeciality && matchesInsurance;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <GlobalSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search hospitals, locations, specialities, doctors..."
          />
        </div>

        <SearchFilters
          location={location}
          setLocation={setLocation}
          speciality={speciality}
          setSpeciality={setSpeciality}
          insuranceProvider={insuranceProvider}
          setInsuranceProvider={setInsuranceProvider}
        />

        <HospitalResults
          hospitals={filteredHospitals}
          onRequestCallback={handleRequestCallback}
          onAdmissionEnquiry={handleAdmissionEnquiry}
        />
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