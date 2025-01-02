import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
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
  
  const [schedule, setSchedule] = useState<DaySchedule[]>(
    ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => ({
      day,
      slots: defaultSlots.map(time => ({
        time,
        available: true
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule & Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {schedule.map((day, dayIndex) => (
            <div key={day.day} className="space-y-4">
              <h3 className="font-semibold">{day.day}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {day.slots.map((slot, slotIndex) => (
                  <div key={slot.time} className="flex items-center space-x-2">
                    <Switch
                      id={`${day.day}-${slot.time}`}
                      checked={slot.available}
                      onCheckedChange={() => handleToggleSlot(dayIndex, slotIndex)}
                    />
                    <Label htmlFor={`${day.day}-${slot.time}`}>{slot.time}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}