import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types/doctor";
import { PatientSelectionSection } from "./appointment/PatientSelectionSection";
import { ConsultationTypeSection } from "./appointment/ConsultationTypeSection";
import { DateTimeSection } from "./appointment/DateTimeSection";
import { AppointmentSummary } from "./appointment/AppointmentSummary";
import { useToast } from "@/hooks/use-toast";

interface AppointmentDialogProps {
  doctor: Doctor;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentDialog({ doctor, open, onOpenChange }: AppointmentDialogProps) {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("10:30 AM");
  const [selectedPatient, setSelectedPatient] = useState("self");
  const [consultationType, setConsultationType] = useState("clinic");

  // Example dependents - in a real app, these would come from user data
  const dependents = [
    { id: "1", name: "John Doe Jr.", relation: "Son", status: "approved" as const },
    { id: "2", name: "Mary Doe", relation: "Daughter", status: "approved" as const },
  ];

  // Generate time slots from 10:30 AM to 6:00 PM with 15-minute intervals
  const generateTimeSlots = () => {
    const slots = [];
    let hour = 10;
    let minute = 30;
    
    while (hour < 18 || (hour === 18 && minute === 0)) {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const timeString = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
      slots.push(timeString);
      
      minute += 15;
      if (minute >= 60) {
        minute = 0;
        hour += 1;
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleConfirmBooking = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${doctor.name} has been confirmed.`,
      variant: "default",
      duration: 5000,
      className: "bg-secondary text-white border-none",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white shadow-2xl border-2 border-secondary/20">
        <div className="space-y-4">
          <DialogHeader className="border-b pb-4 mt-4">
            <DialogTitle className="text-2xl font-bold text-primary bg-gradient-to-r from-secondary/10 to-transparent p-2 rounded-lg">
              Book Appointment with {doctor.name}
            </DialogTitle>
          </DialogHeader>
          
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

          <div className="flex justify-end space-x-3 border-t pt-2 mt-[-25px]">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button 
              className="bg-secondary hover:bg-secondary/90 text-white font-semibold shadow-lg"
              disabled={!date || !selectedTime}
              onClick={handleConfirmBooking}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}