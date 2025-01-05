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

  const defaultSlots = generateTimeSlots();
  
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
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Date</h3>
            <div className="bg-accent rounded-lg p-4 flex justify-center lg:justify-start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                disabled={(date) => date < new Date()}
                className="rounded-md border shadow-sm bg-white"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0 bg-white rounded-lg p-4">
            {selectedDayIndex !== -1 && (
              <DayAvailability
                day={schedule[selectedDayIndex].day}
                isAvailable={schedule[selectedDayIndex].isAvailable}
                onToggle={() => handleToggleDayAvailability(selectedDayIndex)}
              />
            )}

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Time Slots for {format(date, 'EEEE, MMMM d')}
            </h3>
            
            {selectedDayIndex !== -1 && schedule[selectedDayIndex].isAvailable && (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
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