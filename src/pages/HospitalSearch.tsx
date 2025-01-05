import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Hospital } from "@/types/hospital";
import { Navbar } from "@/components/Navbar";
import { SearchFilters } from "@/components/hospital/SearchFilters";
import { HospitalResults } from "@/components/hospital/HospitalResults";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HospitalSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const { data: hospitalsData, error: hospitalsError } = await supabase
          .from('hospitals')
          .select(`
            *,
            departments (name),
            insurance_affiliations (
              insurance_providers (name)
            )
          `);

        if (hospitalsError) {
          throw hospitalsError;
        }

        const transformedHospitals = hospitalsData.map((hospital: any) => ({
          id: hospital.id,
          name: hospital.name,
          location: `${hospital.address}, ${hospital.city}, ${hospital.district}`,
          departments: hospital.departments?.map((dept: any) => dept.name) || [],
          insuranceProviders: hospital.insurance_affiliations?.map((aff: any) => aff.insurance_providers.name) || [],
          rating: 4.5, // Placeholder rating
          specialities: hospital.departments?.map((dept: any) => dept.name) || [],
          doctors: [], // To be implemented
          reviews: [], // To be implemented
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

  const handleRequestCallback = (hospital: Hospital) => {
    toast({
      title: "Request Sent",
      description: `We'll contact you shortly about ${hospital.name}`,
    });
  };

  const handleAdmissionEnquiry = (hospital: Hospital) => {
    toast({
      title: "Enquiry Sent",
      description: `Your admission enquiry for ${hospital.name} has been received`,
    });
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const searchTerms = searchQuery.toLowerCase().split(" ");
    const matchesSearch = searchQuery === "" || searchTerms.every(term =>
      hospital.name.toLowerCase().includes(term) ||
      hospital.location.toLowerCase().includes(term) ||
      hospital.specialities.some(spec => 
        spec.toLowerCase().includes(term)
      )
    );

    const matchesLocation = !location || hospital.location.toLowerCase().includes(location.toLowerCase());
    const matchesSpeciality = !speciality || hospital.specialities.some(spec => 
      spec.toLowerCase() === speciality.toLowerCase()
    );
    
    return matchesSearch && matchesLocation && matchesSpeciality;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-32">
        <Card className="mb-6 md:mb-12 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2 pt-12 md:pt-16">
            <CardTitle className="text-2xl md:text-3xl font-bold text-[#1A1F2C]">
              Find a Hospital
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SearchFilters
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={location}
              setLocation={setLocation}
              speciality={speciality}
              setSpeciality={setSpeciality}
            />
          </CardContent>
        </Card>
        
        <HospitalResults 
          hospitals={filteredHospitals}
          onRequestCallback={handleRequestCallback}
          onAdmissionEnquiry={handleAdmissionEnquiry}
        />
      </div>
    </div>
  );
}
