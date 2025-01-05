import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, addDays, subDays } from "date-fns";
import { ReadingInputRow } from "./ReadingInputRow";
import { ReadingControls } from "./ReadingControls";
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
    <div className="space-y-4 p-4">
      <div className="space-y-4">
        {readingInputs.map((input) => (
          <ReadingInputRow
            key={input.id}
            id={input.id}
            glucoseLevel={input.glucoseLevel}
            readingDate={input.readingDate}
            showRemove={readingInputs.length > 1}
            onInputChange={handleInputChange}
            onPreviousDay={handlePreviousDay}
            onNextDay={handleNextDay}
            onRemoveRow={handleRemoveRow}
          />
        ))}
        
        <ReadingControls
          onAddRow={handleAddRow}
          onSaveReadings={handleAddReadings}
        />
      </div>

      <Card className="p-4">
        <GlucoseChart readings={readings} />
        {readings.length > 0 && <RecentReadings readings={readings} />}
      </Card>
    </div>
  );
}