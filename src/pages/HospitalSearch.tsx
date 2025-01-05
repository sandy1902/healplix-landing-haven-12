import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Hospital } from "@/types/hospital";
import { supabase } from "@/integrations/supabase/client";
import { HospitalResults } from "@/components/hospital/HospitalResults";
import { SearchFilters } from "@/components/hospital/SearchFilters";
import { Navbar } from "@/components/Navbar";

export default function HospitalSearch() {
  const { toast } = useToast();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHospitals() {
      try {
        const { data: hospitalsData, error } = await supabase
          .from('hospitals')
          .select(`
            *,
            departments (*),
            insurance_affiliations (
              insurance_providers (*)
            )
          `);

        if (error) {
          throw error;
        }

        const transformedHospitals = hospitalsData.map((hospital: any) => ({
          id: hospital.id,
          name: hospital.name,
          address: hospital.address,
          city: hospital.city,
          district: hospital.district,
          phoneNumber: hospital.phone_number,
          managingDirector: hospital.managing_director,
          managingDirectorPhone: hospital.managing_director_phone,
          departments: hospital.departments?.map((dept: any) => dept.name) || [],
          insuranceProviders: hospital.insurance_affiliations?.map((aff: any) => aff.insurance_providers.name) || [],
          rating: 4.5, // Placeholder rating
          specialities: hospital.departments?.map((dept: any) => dept.name) || [],
          doctors: [
            {
              name: "Dr. Rohith",
              qualification: "MBBS, MD",
              speciality: "Internal Medicine",
              image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png"
            }
          ],
          reviews: [], // To be implemented
          image: "https://images.unsplash.com/photo-1632833239869-a37e3a5806d2?q=80&w=1000&auto=format&fit=crop",
          location: `${hospital.city}, ${hospital.district}`
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
    const matchesSearch = searchQuery === "" || 
      hospital.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hospital.specialities.some(spec => 
        spec.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesLocation = !selectedLocation || 
      hospital.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesSpecialty = !selectedSpecialty ||
      hospital.specialities.some(spec => 
        spec.toLowerCase() === selectedSpecialty.toLowerCase()
      );

    return matchesSearch && matchesLocation && matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9b87f5]/10 to-[#7E69AB]/10">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedSpecialty={selectedSpecialty}
          setSelectedSpecialty={setSelectedSpecialty}
        />
        
        <HospitalResults 
          hospitals={filteredHospitals}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}