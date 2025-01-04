import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Doctor } from "@/types/doctor";

interface DateTimeSectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  doctor: Doctor;
}

interface TimeSlot {
  time: string;
  available: boolean;
  videoConsultation: boolean;
  clinicAppointment: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
  isAvailable: boolean;
}

export function DateTimeSection({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  doctor,
}: DateTimeSectionProps) {
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);

  // This would typically come from an API call to get doctor's schedule
  const doctorSchedule: DaySchedule[] = [
    {
      day: "Mon",
      isAvailable: true,
      slots: [
        {
          time: "09:00 AM",
          available: true,
          videoConsultation: true,
          clinicAppointment: true
        },
        {
          time: "10:00 AM",
          available: true,
          videoConsultation: true,
          clinicAppointment: true
        },
        // Add more slots as needed
      ]
    },
    // Add more days as needed
  ];

  useEffect(() => {
    if (date) {
      const dayOfWeek = format(date, 'EEE');
      const daySchedule = doctorSchedule.find(schedule => schedule.day === dayOfWeek);
      
      if (daySchedule && daySchedule.isAvailable) {
        setAvailableSlots(daySchedule.slots.filter(slot => slot.available));
      } else {
        setAvailableSlots([]);
      }
      
      // Reset selected time when date changes
      setSelectedTime(undefined);
    }
  }, [date, setSelectedTime]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-accent rounded-lg p-3">
        <h3 className="text-lg font-semibold mb-2 text-primary">Select Date</h3>
        <div className="bg-white rounded-md p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            disabled={(date) => {
              const dayOfWeek = format(date, 'EEE');
              const daySchedule = doctorSchedule.find(schedule => schedule.day === dayOfWeek);
              return date < new Date() || !daySchedule?.isAvailable;
            }}
          />
        </div>
      </div>

      <div className="bg-accent rounded-lg p-3">
        <h3 className="text-lg font-semibold mb-2 text-primary">Select Time</h3>
        {date ? (
          availableSlots.length > 0 ? (
            <Select value={selectedTime} onValueChange={setSelectedTime}>
              <SelectTrigger className="w-full bg-white">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot) => (
                  <SelectItem key={slot.time} value={slot.time}>
                    {slot.time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-500 text-sm bg-white p-3 rounded-md">
              No available time slots for this date
            </p>
          )
        ) : (
          <p className="text-gray-500 text-sm bg-white p-3 rounded-md">
            Please select a date first
          </p>
        )}
      </div>
    </div>
  );
}