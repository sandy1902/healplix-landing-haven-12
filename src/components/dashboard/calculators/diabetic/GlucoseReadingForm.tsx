import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ReadingInput {
  id: string;
  glucoseLevel: string;
  readingDate: string;
}

interface GlucoseReadingFormProps {
  readingInputs: ReadingInput[];
  onInputChange: (id: string, field: keyof ReadingInput, value: string) => void;
  onPreviousDay: (id: string) => void;
  onNextDay: (id: string) => void;
  onRemoveRow: (id: string) => void;
}

export function GlucoseReadingForm({
  readingInputs,
  onInputChange,
  onPreviousDay,
  onNextDay,
  onRemoveRow,
}: GlucoseReadingFormProps) {
  return (
    <div className="space-y-4">
      {readingInputs.map((input) => (
        <div key={input.id} className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Blood Glucose Level (mg/dL)
            </label>
            <Input
              type="number"
              value={input.glucoseLevel}
              onChange={(e) => onInputChange(input.id, 'glucoseLevel', e.target.value)}
              placeholder="Enter blood glucose level"
              className="w-full"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Reading Date
            </label>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => onPreviousDay(input.id)}
                className="shrink-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Input
                type="date"
                value={input.readingDate}
                onChange={(e) => onInputChange(input.id, 'readingDate', e.target.value)}
                className="w-full"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => onNextDay(input.id)}
                className="shrink-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {readingInputs.length > 1 && (
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => onRemoveRow(input.id)}
              className="shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}