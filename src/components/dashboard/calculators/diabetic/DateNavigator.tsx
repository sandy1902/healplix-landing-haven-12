import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface DateNavigatorProps {
  date: string;
  onPreviousDay: () => void;
  onNextDay: () => void;
  onDateChange: (date: string) => void;
}

export function DateNavigator({ 
  date, 
  onPreviousDay, 
  onNextDay, 
  onDateChange 
}: DateNavigatorProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-2">
        Reading Date
      </label>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onPreviousDay}
          className="shrink-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Input
          type="date"
          value={date}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-full"
        />
        <Button 
          variant="outline" 
          size="icon"
          onClick={onNextDay}
          className="shrink-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}