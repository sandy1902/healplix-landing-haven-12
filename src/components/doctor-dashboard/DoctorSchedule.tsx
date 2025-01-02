import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { addDays, format } from "date-fns";

interface TimeSlot {
  time: string;
  available: boolean;
  videoConsultation: boolean;
  clinicAppointment: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
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
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Select Date</h3>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              disabled={(date) => date < new Date()}
              className="rounded-md border"
            />
          </div>

          <div className="space-y-6">
            <h3 className="font-semibold">Time Slots for {format(date, 'EEEE, MMMM d')}</h3>
            {selectedDayIndex !== -1 && (
              <div className="space-y-4">
                {schedule[selectedDayIndex].slots.map((slot, slotIndex) => (
                  <div key={slot.time} className="flex flex-col space-y-2 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${schedule[selectedDayIndex].day}-${slot.time}`}>
                        {slot.time}
                      </Label>
                      <Switch
                        id={`${schedule[selectedDayIndex].day}-${slot.time}`}
                        checked={slot.available}
                        onCheckedChange={() => handleToggleSlot(selectedDayIndex, slotIndex)}
                      />
                    </div>
                    
                    {slot.available && (
                      <div className="flex flex-col space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`video-${slotIndex}`}
                            checked={slot.videoConsultation}
                            onCheckedChange={() => 
                              handleToggleAppointmentType(selectedDayIndex, slotIndex, 'videoConsultation')
                            }
                          />
                          <Label htmlFor={`video-${slotIndex}`}>Video Consultation</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`clinic-${slotIndex}`}
                            checked={slot.clinicAppointment}
                            onCheckedChange={() => 
                              handleToggleAppointmentType(selectedDayIndex, slotIndex, 'clinicAppointment')
                            }
                          />
                          <Label htmlFor={`clinic-${slotIndex}`}>Clinic Appointment</Label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}