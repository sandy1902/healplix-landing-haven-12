import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

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

  const getStatusColor = (level: number) => {
    if (level < 70) return "#EF4444"; // Red for low
    if (level > 180) return "#EF4444"; // Red for high
    return "#22C55E"; // Green for normal
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {readingInputs.map((input, index) => (
          <div key={input.id} className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                Blood Glucose Level (mg/dL)
              </label>
              <Input
                type="number"
                value={input.glucoseLevel}
                onChange={(e) => handleInputChange(input.id, 'glucoseLevel', e.target.value)}
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
                  onClick={() => handlePreviousDay(input.id)}
                  className="shrink-0"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Input
                  type="date"
                  value={input.readingDate}
                  onChange={(e) => handleInputChange(input.id, 'readingDate', e.target.value)}
                  className="w-full"
                />
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => handleNextDay(input.id)}
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
                onClick={() => handleRemoveRow(input.id)}
                className="shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
        
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
        <div className="h-[300px] w-full">
          <ChartContainer
            className="h-full"
            config={{
              line: {
                theme: {
                  light: "#0EA5E9",
                  dark: "#0EA5E9",
                },
              },
            }}
          >
            <LineChart data={readings} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="timestamp" 
                label={{ value: 'Time', position: 'bottom' }}
              />
              <YAxis 
                domain={[0, 300]}
                label={{ value: 'Blood Glucose (mg/dL)', angle: -90, position: 'left' }}
              />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="text-sm font-medium">{data.fullDate}</p>
                      <p className="text-sm">Time: {data.timestamp}</p>
                      <p className="text-sm" style={{ color: getStatusColor(data.level) }}>
                        Level: {data.level} mg/dL
                      </p>
                    </div>
                  );
                }
                return null;
              }} />
              <Legend />
              {/* Normal range reference lines */}
              <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="3 3" label="Low" />
              <ReferenceLine y={180} stroke="#EF4444" strokeDasharray="3 3" label="High" />
              <Line
                type="monotone"
                dataKey="level"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={{ fill: "#0EA5E9" }}
              />
            </LineChart>
          </ChartContainer>
        </div>

        {readings.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Recent Readings</h4>
            <div className="space-y-2">
              {[...readings].reverse().slice(0, 5).map((reading, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 rounded"
                  style={{ backgroundColor: `${getStatusColor(reading.level)}15` }}
                >
                  <div>
                    <span className="text-sm font-medium">{reading.fullDate}</span>
                    <span className="text-sm text-gray-600 ml-2">{reading.timestamp}</span>
                  </div>
                  <span
                    className="font-medium"
                    style={{ color: getStatusColor(reading.level) }}
                  >
                    {reading.level} mg/dL
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}