import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface DateTimeSectionProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  timeSlots: string[];
}

export function DateTimeSection({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  timeSlots,
}: DateTimeSectionProps) {
  // Set default time to 10:30 AM if no time is selected
  if (!selectedTime) {
    setSelectedTime("10:30 AM");
  }

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

      <div className="bg-accent rounded-lg p-3">
        <h3 className="text-lg font-semibold mb-2 text-primary">Select Time</h3>
        <Select value={selectedTime} onValueChange={setSelectedTime}>
          <SelectTrigger className="w-full bg-white">
            <SelectValue placeholder="Select a time slot" />
          </SelectTrigger>
          <SelectContent>
            {timeSlots.map((time) => (
              <SelectItem key={time} value={time}>
                {time}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}