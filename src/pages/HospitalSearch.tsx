import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/hospital/SearchFilters";
import { HospitalResults } from "@/components/hospital/HospitalResults";
import { Hospital } from "@/types/hospital";
import { supabase } from "@/integrations/supabase/client";

export default function HospitalSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        let query = supabase
          .from('hospitals')
          .select(`
            *,
            departments (
              name
            ),
            insurance_affiliations (
              insurance_provider: insurance_providers ( id, name )
            )
          `);

        const { data: hospitalsData, error } = await query;

        if (error) {
          throw error;
        }

        const transformedHospitals: Hospital[] = hospitalsData.map(hospital => ({
          id: hospital.id,
          name: hospital.name,
          location: `${hospital.city}, ${hospital.district}`,
          rating: 4.5,
          specialities: hospital.departments?.map((dept: any) => dept.name) || [],
          image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=1000&auto=format&fit=crop",
          doctors: [
            {
              name: "Dr. Rohith",
              qualification: "MBBS, MD",
              speciality: "Cardiology",
              image: "/lovable-uploads/90596b33-e062-4036-af14-0be9f996722e.png"
            },
            {
              name: "Dr. Sudharshan Reddy",
              qualification: "MBBS, MS",
              speciality: "Orthopedics",
              image: "/lovable-uploads/90596b33-e062-4036-af14-0be9f996722e.png"
            }
          ],
          insuranceProviders: hospital.insurance_affiliations?.map(
            (affiliation: any) => affiliation.insurance_provider.name
          ) || [],
          reviews: [
            {
              id: "1",
              userName: "John Doe",
              rating: 5,
              comment: "Excellent facilities and staff",
              date: "2024-01-01"
            },
            {
              id: "2",
              userName: "Jane Smith",
              rating: 4,
              comment: "Good experience overall",
              date: "2024-01-02"
            }
          ]
        }));

        setHospitals(transformedHospitals);
      } catch (error) {
        console.error('Error fetching hospitals:', error);
        toast({
          title: "Error",
          description: "Failed to load hospitals. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchHospitals();
  }, [toast]);

  const filteredHospitals = hospitals.filter(hospital => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchQuery === "" || searchTerms.every(term =>
      hospital.name.toLowerCase().includes(term) ||
      hospital.location.toLowerCase().includes(term) ||
      hospital.specialities.some(spec => spec.toLowerCase().includes(term))
    );

    const matchesLocation = !location || hospital.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || hospital.specialities.includes(speciality);
    const matchesInsurance = !insuranceProvider || hospital.insuranceProviders.some(
      provider => provider.toLowerCase() === insuranceProvider.toLowerCase()
    );

    return matchesSearch && matchesLocation && matchesSpeciality && matchesInsurance;
  });

  const handleRequestCallback = (hospital: Hospital) => {
    toast({
      title: "Callback Requested",
      description: `We'll contact you shortly about ${hospital.name}`,
    });
  };

  const handleAdmissionEnquiry = (hospital: Hospital) => {
    toast({
      title: "Admission Enquiry Sent",
      description: `Your enquiry for ${hospital.name} has been received`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-32">
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
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
    </div>
  );
}