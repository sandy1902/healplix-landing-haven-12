import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Doctor } from "@/types/doctor";
import { TimeSlot } from "@/types/appointment";
import { getAvailableSlots, isDateDisabled } from "@/utils/timeUtils";
import { TimeSlotSelector } from "./TimeSlotSelector";

interface DateTimeSectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  doctor: Doctor;
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
  const doctorSchedule = [
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
      ]
    },
  ];

  useEffect(() => {
    const slots = getAvailableSlots(date, doctorSchedule);
    setAvailableSlots(slots);
    setSelectedTime(undefined);
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
            disabled={(date) => isDateDisabled(date, doctorSchedule)}
          />
        </div>
      </div>

      <div className="bg-accent rounded-lg p-3">
        <h3 className="text-lg font-semibold mb-2 text-primary">Select Time</h3>
        {date ? (
          <TimeSlotSelector
            availableSlots={availableSlots}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        ) : (
          <p className="text-gray-500 text-sm bg-white p-3 rounded-md">
            Please select a date first
          </p>
        )}
      </div>
    </div>
  );
}