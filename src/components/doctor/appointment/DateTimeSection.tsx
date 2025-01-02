import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

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
  );
}