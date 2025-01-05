import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";

interface GlucoseReading {
  timestamp: string;
  fullDate: string;
  level: number;
  readingDate: string;
}

interface GlucoseChartProps {
  readings: GlucoseReading[];
}

export function GlucoseChart({ readings }: GlucoseChartProps) {
  const getStatusColor = (level: number) => {
    if (level < 70) return "#EF4444"; // Red for low
    if (level > 180) return "#EF4444"; // Red for high
    return "#22C55E"; // Green for normal
  };

  return (
    <div className="h-[300px] w-full overflow-x-auto">
      <ChartContainer
        className="h-full min-w-[600px]"
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
  );
}