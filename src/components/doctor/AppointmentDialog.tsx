import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { PatientSelectionSection } from "./appointment/PatientSelectionSection";
import { ConsultationTypeSection } from "./appointment/ConsultationTypeSection";
import { DateTimeSection } from "./appointment/DateTimeSection";
import { AppointmentSummary } from "./appointment/AppointmentSummary";

interface AppointmentDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDialog({ doctor, open, onOpenChange }: AppointmentDialogProps) {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [selectedPatient, setSelectedPatient] = useState("self");
  const [consultationType, setConsultationType] = useState("clinic");

  // Example dependents - in a real app, these would come from user data
  const dependents = [
    { id: "1", name: "John Doe Jr.", relation: "Son", status: "approved" as const },
    { id: "2", name: "Mary Doe", relation: "Daughter", status: "approved" as const },
  ];

  // Example time slots - in a real app, these would come from an API
  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Book Appointment with {doctor.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <PatientSelectionSection
              selectedPatient={selectedPatient}
              setSelectedPatient={setSelectedPatient}
              dependents={dependents}
            />
            <ConsultationTypeSection
              consultationType={consultationType}
              setConsultationType={setConsultationType}
              doctor={doctor}
            />
          </div>

          <DateTimeSection
            date={date}
            setDate={setDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            timeSlots={timeSlots}
          />

          <AppointmentSummary
            doctor={doctor}
            selectedPatient={selectedPatient}
            consultationType={consultationType}
            date={date}
            selectedTime={selectedTime}
            dependents={dependents}
          />
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button 
            className="bg-[#9b87f5] hover:bg-[#7E69AB]"
            disabled={!date || !selectedTime}
          >
            Confirm Booking
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}