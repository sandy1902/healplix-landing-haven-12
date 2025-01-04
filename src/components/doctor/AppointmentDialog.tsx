import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Doctor } from "@/types/doctor";
import { ConsultationTypeSection } from "./appointment/ConsultationTypeSection";
import { PatientSelectionSection } from "./appointment/PatientSelectionSection";
import { DateTimeSection } from "./appointment/DateTimeSection";
import { AppointmentSummary } from "./appointment/AppointmentSummary";

interface AppointmentDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDialog({ doctor, open, onOpenChange }: AppointmentDialogProps) {
  const { toast } = useToast();
  const [consultationType, setConsultationType] = useState("clinic");
  const [selectedPatient, setSelectedPatient] = useState("self");
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const dependents = [
    { id: "1", name: "John Doe Jr.", relation: "Son", status: "approved" as const },
    { id: "2", name: "Jane Doe", relation: "Daughter", status: "approved" as const },
  ];

  const handleBookAppointment = () => {
    if (!date || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select both date and time for the appointment.",
      });
      return;
    }

    toast({
      title: "Appointment Booked",
      description: "Your appointment has been successfully scheduled.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] h-[90vh] bg-white shadow-2xl border-2 border-secondary/20">
        <div className="px-8 py-6 overflow-y-auto h-full">
          <DialogHeader className="border-b pb-6 mb-8">
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              Book Appointment with {doctor.name}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConsultationTypeSection
                consultationType={consultationType}
                setConsultationType={setConsultationType}
                doctor={doctor}
              />

              <PatientSelectionSection
                selectedPatient={selectedPatient}
                setSelectedPatient={setSelectedPatient}
                dependents={dependents}
              />
            </div>

            <DateTimeSection
              date={date}
              setDate={setDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              doctor={doctor}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AppointmentSummary
                doctor={doctor}
                selectedPatient={selectedPatient}
                consultationType={consultationType}
                date={date}
                selectedTime={selectedTime}
                dependents={dependents}
              />

              <div className="flex flex-col justify-center space-y-4">
                <Button
                  onClick={handleBookAppointment}
                  className="bg-[#7E69AB] hover:bg-[#6A5B8A] text-white w-full"
                >
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="border-[#7E69AB] text-[#7E69AB] hover:bg-[#7E69AB]/10 w-full"
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