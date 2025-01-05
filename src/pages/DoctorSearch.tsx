import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { AppointmentDialog } from "@/components/doctor/AppointmentDialog";
import { Doctor } from "@/types/doctor";
import { Navbar } from "@/components/Navbar";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchResults } from "@/components/search/SearchResults";
import { supabase } from "@/integrations/supabase/client";
import { transformProfileToDoctor } from "@/utils/doctorUtils";

export default function DoctorSearch() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [speciality, setSpeciality] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('role', 'doctor');

        if (error) {
          throw error;
        }

        const transformedDoctors = profiles.map(transformProfileToDoctor);
        setDoctors(transformedDoctors);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast({
          title: "Error",
          description: "Failed to load doctors. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchDoctors();
  }, [toast]);

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
      <Navbar />
      <div className="container mx-auto px-4 py-6 md:py-32">
        <SearchHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={location}
          setLocation={setLocation}
          speciality={speciality}
          setSpeciality={setSpeciality}
        />
        
        <SearchResults 
          doctors={filteredDoctors}
          onBookAppointment={handleBookAppointment}
        />
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