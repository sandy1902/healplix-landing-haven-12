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
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-3 rounded"
            style={{ backgroundColor: `${getStatusColor(reading.level)}15` }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <span className="text-sm font-medium">{reading.fullDate}</span>
              <span className="text-sm text-gray-600">{reading.timestamp}</span>
            </div>
            <span
              className="font-medium mt-1 md:mt-0"
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