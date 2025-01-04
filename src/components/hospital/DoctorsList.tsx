import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface Doctor {
  name: string;
  qualification: string;
  speciality: string;
}

interface DoctorsListProps {
  doctors: Doctor[];
}

export function DoctorsList({ doctors }: DoctorsListProps) {
  const { toast } = useToast();

  const handleBookAppointment = (doctor: Doctor) => {
    toast({
      title: "Appointment Request Sent",
      description: `We'll contact you shortly to schedule your appointment with ${doctor.name}.`,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {doctors.map((doctor) => (
        <div key={doctor.name} className="flex items-start space-x-4 p-4 bg-white rounded-lg">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-medium text-[#333333]">{doctor.name}</h4>
            <p className="text-sm text-[#7E69AB]">{doctor.speciality}</p>
            <p className="text-sm text-[#8E9196] mb-2">{doctor.qualification}</p>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/10"
              onClick={() => handleBookAppointment(doctor)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}