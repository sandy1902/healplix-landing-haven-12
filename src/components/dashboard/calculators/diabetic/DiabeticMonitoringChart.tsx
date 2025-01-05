import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, addDays, subDays } from "date-fns";
import { Plus } from "lucide-react";
import { GlucoseReadingForm } from "./GlucoseReadingForm";
import { GlucoseChart } from "./GlucoseChart";
import { RecentReadings } from "./RecentReadings";

interface GlucoseReading {
  timestamp: string;
  fullDate: string;
  level: number;
  readingDate: string;
}

interface ReadingInput {
  id: string;
  glucoseLevel: string;
  readingDate: string;
}

export default function DiabeticMonitoringChart() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [readingInputs, setReadingInputs] = useState<ReadingInput[]>([
    { id: '1', glucoseLevel: '', readingDate: format(new Date(), 'yyyy-MM-dd') }
  ]);

  const handleAddRow = () => {
    const newId = (readingInputs.length + 1).toString();
    setReadingInputs([
      ...readingInputs,
      { id: newId, glucoseLevel: '', readingDate: format(new Date(), 'yyyy-MM-dd') }
    ]);
  };

  const handleRemoveRow = (id: string) => {
    if (readingInputs.length > 1) {
      setReadingInputs(readingInputs.filter(input => input.id !== id));
    }
  };

  const handleInputChange = (id: string, field: keyof ReadingInput, value: string) => {
    setReadingInputs(readingInputs.map(input => 
      input.id === id ? { ...input, [field]: value } : input
    ));
  };

  const handlePreviousDay = (id: string) => {
    const input = readingInputs.find(i => i.id === id);
    if (input) {
      const currentDate = new Date(input.readingDate);
      handleInputChange(id, 'readingDate', format(subDays(currentDate, 1), 'yyyy-MM-dd'));
    }
  };

  const handleNextDay = (id: string) => {
    const input = readingInputs.find(i => i.id === id);
    if (input) {
      const currentDate = new Date(input.readingDate);
      handleInputChange(id, 'readingDate', format(addDays(currentDate, 1), 'yyyy-MM-dd'));
    }
  };

  const handleAddReadings = () => {
    const validReadings = readingInputs.filter(input => input.glucoseLevel);
    const newReadings = validReadings.map(input => ({
      timestamp: format(new Date(input.readingDate), 'HH:mm'),
      fullDate: format(new Date(input.readingDate), 'MMM dd, yyyy'),
      level: parseFloat(input.glucoseLevel),
      readingDate: input.readingDate
    }));

    setReadings([...readings, ...newReadings]);
    setReadingInputs([{ id: '1', glucoseLevel: '', readingDate: format(new Date(), 'yyyy-MM-dd') }]);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <GlucoseReadingForm
          readingInputs={readingInputs}
          onInputChange={handleInputChange}
          onPreviousDay={handlePreviousDay}
          onNextDay={handleNextDay}
          onRemoveRow={handleRemoveRow}
        />
        
        <div className="flex gap-2">
          <Button 
            onClick={handleAddRow}
            variant="outline"
            className="flex-1"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add More Readings
          </Button>
          <Button onClick={handleAddReadings} className="flex-1">
            Save All Readings
          </Button>
        </div>
      </div>

      <Card className="p-4">
        <GlucoseChart readings={readings} />
        {readings.length > 0 && <RecentReadings readings={readings} />}
      </Card>
    </div>
  );
}