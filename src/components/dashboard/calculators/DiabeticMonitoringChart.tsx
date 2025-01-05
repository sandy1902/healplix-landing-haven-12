import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface GlucoseReading {
  timestamp: string;
  level: number;
}

export default function DiabeticMonitoringChart() {
  const [readings, setReadings] = useState<GlucoseReading[]>([]);
  const [glucoseLevel, setGlucoseLevel] = useState("");

  const handleAddReading = () => {
    if (glucoseLevel) {
      const newReading: GlucoseReading = {
        timestamp: new Date().toLocaleTimeString(),
        level: parseFloat(glucoseLevel)
      };
      setReadings([...readings, newReading]);
      setGlucoseLevel("");
    }
  };

  const getStatusColor = (level: number) => {
    if (level < 70) return "#EF4444"; // Red for low
    if (level > 180) return "#EF4444"; // Red for high
    return "#22C55E"; // Green for normal
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Blood Glucose Level (mg/dL)
          </label>
          <Input
            type="number"
            value={glucoseLevel}
            onChange={(e) => setGlucoseLevel(e.target.value)}
            placeholder="Enter blood glucose level"
            className="w-full"
          />
        </div>
        <Button onClick={handleAddReading} className="mb-0">
          Add Reading
        </Button>
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
              <XAxis dataKey="timestamp" />
              <YAxis domain={[0, 300]} />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
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
                  <span>{reading.timestamp}</span>
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