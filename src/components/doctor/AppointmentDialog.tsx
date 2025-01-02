import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Doctor } from "@/types/doctor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PatientSelector } from "@/components/dashboard/PatientSelector";

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
          {/* Patient Selection */}
          <div className="bg-accent rounded-lg p-3">
            <h3 className="text-lg font-semibold mb-2 text-primary">Select Patient</h3>
            <PatientSelector
              selectedPatient={selectedPatient}
              onPatientSelect={setSelectedPatient}
              dependents={dependents}
            />
          </div>

          {/* Consultation Type */}
          <div className="bg-accent rounded-lg p-3">
            <h3 className="text-lg font-semibold mb-2 text-primary">Consultation Type</h3>
            <Select value={consultationType} onValueChange={setConsultationType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select consultation type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clinic">Clinic Visit (₹{doctor.clinicVisit.charges})</SelectItem>
                <SelectItem value="video">Video Consultation (₹{doctor.videoConsultation.charges})</SelectItem>
                <SelectItem value="followup">Follow-up Visit (₹500)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Calendar Section */}
            <div className="bg-accent rounded-lg p-3">
              <h3 className="text-lg font-semibold mb-2 text-primary">Select Date</h3>
              <div className="bg-white rounded-md p-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="w-full"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption: "flex justify-center pt-1 relative items-center",
                    caption_label: "text-sm font-medium",
                    nav: "space-x-1 flex items-center",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "text-center text-sm relative p-0 hover:bg-accent",
                    day: "h-8 w-8 p-0 font-normal",
                    day_range_end: "day-range-end",
                    day_selected: "bg-primary text-primary-foreground hover:bg-primary",
                    day_today: "bg-accent text-accent-foreground",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_hidden: "invisible",
                  }}
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>

            {/* Time Slots Section */}
            <div className="bg-accent rounded-lg p-3">
              <h3 className="text-lg font-semibold mb-2 text-primary">Select Time</h3>
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`w-full ${
                      selectedTime === time 
                        ? "bg-[#9b87f5] hover:bg-[#7E69AB]" 
                        : "hover:bg-[#9b87f5]/10"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Section */}
          <div className="bg-accent rounded-lg p-3">
            <h3 className="text-lg font-semibold mb-2 text-primary">Appointment Summary</h3>
            <div className="space-y-1 text-sm">
              <p>Doctor: {doctor.name}</p>
              <p>Patient: {selectedPatient === "self" ? "Self" : 
                dependents.find(d => d.id === selectedPatient)?.name || "Not selected"}</p>
              <p>Type: {consultationType.charAt(0).toUpperCase() + consultationType.slice(1)}</p>
              <p>Date: {date ? format(date, 'MMMM do, yyyy') : 'Not selected'}</p>
              <p>Time: {selectedTime || 'Not selected'}</p>
              <p>Location: {doctor.clinicName}</p>
            </div>
          </div>
        </div>

        {/* Dialog Actions */}
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
