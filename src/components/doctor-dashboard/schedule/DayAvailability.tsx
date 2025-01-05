import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface DayAvailabilityProps {
  day: string;
  isAvailable: boolean;
  onToggle: () => void;
}

export function DayAvailability({ day, isAvailable, onToggle }: DayAvailabilityProps) {
  return (
    <div className="bg-accent p-4 rounded-lg mb-6">
      <div className="flex flex-col items-center space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">
          Day Availability for {day}
        </h3>
        <div className="flex items-center gap-2">
          <Label className="text-sm text-gray-600">No</Label>
          <Slider
            value={[isAvailable ? 100 : 0]}
            onValueChange={(value) => {
              if (value[0] === 100 || value[0] === 0) {
                onToggle();
              }
            }}
            max={100}
            step={100}
            className="w-[60px]"
          />
          <Label className="text-sm text-gray-600">Yes</Label>
        </div>
      </div>
    </div>
  );
}