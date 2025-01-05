import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ReadingControlsProps {
  onAddRow: () => void;
  onSaveReadings: () => void;
}

export function ReadingControls({ onAddRow, onSaveReadings }: ReadingControlsProps) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <Button 
        onClick={onAddRow}
        variant="outline"
        className="flex-1"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add More Readings
      </Button>
      <Button onClick={onSaveReadings} className="flex-1">
        Save All Readings
      </Button>
    </div>
  );
}