import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Doctor } from "@/types/doctor";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

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
    { id: "1", name: "John Doe Jr.", relation: "Son" },
    { id: "2", name: "Mary Doe", relation: "Daughter" },
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
        
        <div className="space-y-6">
          {/* Patient Selection */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-primary">Select Patient</h3>
            <Select value={selectedPatient} onValueChange={setSelectedPatient}>
              <SelectTrigger>
                <SelectValue placeholder="Select patient" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="self">Self</SelectItem>
                {dependents.map((dependent) => (
                  <SelectItem key={dependent.id} value={dependent.id}>
                    {dependent.name} ({dependent.relation})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Consultation Type */}
          <div className="bg-accent rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 text-primary">Consultation Type</h3>
            <RadioGroup
              value={consultationType}
              onValueChange={setConsultationType}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="clinic" id="clinic" />
                <Label htmlFor="clinic" className="cursor-pointer">
                  Clinic Visit (₹{doctor.clinicVisit.charges})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="cursor-pointer">
                  Video Consultation (₹{doctor.videoConsultation.charges})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="followup" id="followup" />
                <Label htmlFor="followup" className="cursor-pointer">
                  Follow-up Visit (₹500)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <div className="bg-accent rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">Select Date</h3>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="bg-white rounded-md shadow-sm"
                disabled={(date) => date < new Date()}
              />
            </div>

            {/* Time Slots Section */}
            <div className="bg-accent rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4 text-primary">Select Time</h3>
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
          <div className="bg-accent rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2 text-primary">Appointment Summary</h3>
            <div className="space-y-2 text-sm">
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

        <div className="mt-6 flex justify-end space-x-2">
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