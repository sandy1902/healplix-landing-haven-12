import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import { TimeSlot } from "./schedule/TimeSlot";
import { DayAvailability } from "./schedule/DayAvailability";

interface TimeSlotType {
  time: string;
  available: boolean;
  videoConsultation: boolean;
  clinicAppointment: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlotType[];
  isAvailable: boolean;
}

export default function DoctorSchedule() {
  const { toast } = useToast();
  const defaultSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM",
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  const [date, setDate] = useState<Date>(new Date());
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => ({
      day,
      isAvailable: true,
      slots: defaultSlots.map(time => ({
        time,
        available: true,
        videoConsultation: false,
        clinicAppointment: true
      }))
    }))
  );

  const handleToggleSlot = (dayIndex: number, slotIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex].available = 
      !newSchedule[dayIndex].slots[slotIndex].available;
    setSchedule(newSchedule);
    
    toast({
      title: "Schedule Updated",
      description: `${schedule[dayIndex].slots[slotIndex].time} on ${schedule[dayIndex].day} ${newSchedule[dayIndex].slots[slotIndex].available ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleToggleDayAvailability = (dayIndex: number) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].isAvailable = !newSchedule[dayIndex].isAvailable;
    setSchedule(newSchedule);

    toast({
      title: "Day Availability Updated",
      description: `${schedule[dayIndex].day} is now ${newSchedule[dayIndex].isAvailable ? 'available' : 'unavailable'}.`,
    });
  };

  const handleToggleAppointmentType = (
    dayIndex: number, 
    slotIndex: number, 
    type: 'videoConsultation' | 'clinicAppointment'
  ) => {
    const newSchedule = [...schedule];
    newSchedule[dayIndex].slots[slotIndex][type] = 
      !newSchedule[dayIndex].slots[slotIndex][type];
    setSchedule(newSchedule);

    toast({
      title: "Appointment Type Updated",
      description: `${type === 'videoConsultation' ? 'Video consultation' : 'Clinic appointment'} ${newSchedule[dayIndex].slots[slotIndex][type] ? 'enabled' : 'disabled'} for ${schedule[dayIndex].slots[slotIndex].time} on ${schedule[dayIndex].day}.`,
    });
  };

  const selectedDayIndex = schedule.findIndex(
    day => day.day === format(date, 'EEE')
  );

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-700">Select Date</h3>
            <div className="p-4 bg-accent rounded-lg">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                disabled={(date) => date < new Date()}
                className="rounded-md border"
              />
            </div>
          </div>

          <div className="space-y-6">
            {selectedDayIndex !== -1 && (
              <DayAvailability
                day={schedule[selectedDayIndex].day}
                isAvailable={schedule[selectedDayIndex].isAvailable}
                onToggle={() => handleToggleDayAvailability(selectedDayIndex)}
              />
            )}

            <h3 className="text-lg font-semibold text-gray-700">
              Time Slots for {format(date, 'EEEE, MMMM d')}
            </h3>
            {selectedDayIndex !== -1 && schedule[selectedDayIndex].isAvailable && (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {schedule[selectedDayIndex].slots.map((slot, slotIndex) => (
                  <TimeSlot
                    key={slot.time}
                    day={schedule[selectedDayIndex].day}
                    time={slot.time}
                    available={slot.available}
                    videoConsultation={slot.videoConsultation}
                    clinicAppointment={slot.clinicAppointment}
                    onToggleSlot={() => handleToggleSlot(selectedDayIndex, slotIndex)}
                    onToggleAppointmentType={(type) => 
                      handleToggleAppointmentType(selectedDayIndex, slotIndex, type)
                    }
                  />
                ))}
              </div>
            )}
            {selectedDayIndex !== -1 && !schedule[selectedDayIndex].isAvailable && (
              <div className="text-center p-8 text-gray-500">
                This day is marked as unavailable. Enable day availability to manage time slots.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}