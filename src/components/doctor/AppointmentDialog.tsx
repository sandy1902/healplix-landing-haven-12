import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { ConsultationTypeSection } from "./appointment/ConsultationTypeSection";
import { PatientSelectionSection } from "./appointment/PatientSelectionSection";
import { DateTimeSection } from "./appointment/DateTimeSection";
import { AppointmentSummary } from "./appointment/AppointmentSummary";
import { useToast } from "@/components/ui/use-toast";

interface AppointmentDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDialog({
  doctor,
  open,
  onOpenChange,
}: AppointmentDialogProps) {
  const [consultationType, setConsultationType] = useState("online");
  const [selectedPatient, setSelectedPatient] = useState("self");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const { toast } = useToast();

  // Dummy data for demonstration
  const dependents = [
    { id: "1", name: "Sarah Smith", relation: "Spouse", status: "approved" as const },
    { id: "2", name: "Tommy Smith", relation: "Son", status: "approved" as const },
  ];

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Please select date and time",
        description: "Date and time are required to book an appointment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment Booked Successfully",
      description: "We'll send you a confirmation email shortly",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[95vw] md:max-w-[1000px] h-[90vh] md:h-[90vh] bg-white/95 backdrop-blur-sm shadow-xl border-2 border-secondary/20 mx-auto my-auto p-2 md:p-6">
        <div className="px-2 md:px-8 py-3 md:py-6 overflow-y-auto h-full">
          <DialogHeader className="border-b pb-3 md:pb-6 mb-4 md:mb-8">
            <DialogTitle className="text-xl md:text-2xl font-bold text-center text-primary">
              Book Appointment with {doctor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 md:space-y-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <ConsultationTypeSection
                consultationType={consultationType}
                setConsultationType={setConsultationType}
              />
              <PatientSelectionSection
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                dependents={dependents}
              />
            </div>

            <DateTimeSection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              doctor={doctor}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <AppointmentSummary
                doctor={doctor}
                selectedPatient={selectedPatient}
                consultationType={consultationType}
                date={selectedDate}
                selectedTime={selectedTime}
                dependents={dependents}
              />

              <div className="flex flex-col justify-center space-y-3 md:space-y-4">
                <Button
                  onClick={handleBookAppointment}
                  className="bg-[#7E69AB] hover:bg-[#6A5B8A] text-white w-full text-sm md:text-base py-2 md:py-3"
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB]/10 w-full text-sm md:text-base py-2 md:py-3"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}