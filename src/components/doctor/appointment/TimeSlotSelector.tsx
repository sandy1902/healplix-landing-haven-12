import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TimeSlot } from "@/types/appointment";

interface TimeSlotSelectorProps {
  availableSlots: TimeSlot[];
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function TimeSlotSelector({
  availableSlots,
  selectedTime,
  setSelectedTime
}: TimeSlotSelectorProps) {
  if (availableSlots.length === 0) {
    return (
      <p className="text-gray-500 text-sm bg-white p-3 rounded-md">
        No available time slots for this date
      </p>
    );
  }

  return (
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
  );
}