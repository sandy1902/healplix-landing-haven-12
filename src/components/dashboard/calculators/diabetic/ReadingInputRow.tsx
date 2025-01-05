import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ReadingInputRowProps {
  id: string;
  glucoseLevel: string;
  readingDate: string;
  showRemove: boolean;
  onInputChange: (id: string, field: 'glucoseLevel' | 'readingDate', value: string) => void;
  onPreviousDay: (id: string) => void;
  onNextDay: (id: string) => void;
  onRemoveRow: (id: string) => void;
}

export function ReadingInputRow({
  id,
  glucoseLevel,
  readingDate,
  showRemove,
  onInputChange,
  onPreviousDay,
  onNextDay,
  onRemoveRow,
}: ReadingInputRowProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-sm font-medium mb-2">
          Blood Glucose Level (mg/dL)
        </label>
        <Input
          type="number"
          value={glucoseLevel}
          onChange={(e) => onInputChange(id, 'glucoseLevel', e.target.value)}
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
            onClick={() => onPreviousDay(id)}
            className="shrink-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Input
            type="date"
            value={readingDate}
            onChange={(e) => onInputChange(id, 'readingDate', e.target.value)}
            className="w-full"
          />
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onNextDay(id)}
            className="shrink-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {showRemove && (
        <div className="flex items-end mb-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => onRemoveRow(id)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}