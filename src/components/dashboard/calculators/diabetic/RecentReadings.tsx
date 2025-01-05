interface GlucoseReading {
  timestamp: string;
  fullDate: string;
  level: number;
  readingDate: string;
}

interface RecentReadingsProps {
  readings: GlucoseReading[];
}

export function RecentReadings({ readings }: RecentReadingsProps) {
  const getStatusColor = (level: number) => {
    if (level < 70) return "#EF4444"; // Red for low
    if (level > 180) return "#EF4444"; // Red for high
    return "#22C55E"; // Green for normal
  };

  return (
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
  );
}