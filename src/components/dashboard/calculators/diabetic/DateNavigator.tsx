import { Input } from "@/components/ui/input";

interface DateNavigatorProps {
  date: string;
  onDateChange: (date: string) => void;
}

export function DateNavigator({ 
  date, 
  onDateChange 
}: DateNavigatorProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium mb-2">
        Reading Date
      </label>
      <Input
        type="date"
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}