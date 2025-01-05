import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, Star } from "lucide-react";

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="p-2 bg-secondary/20 rounded-full">
        {icon}
      </div>
      <p className="text-sm font-medium">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

export function QuickStats() {
  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div className="flex justify-around">
          <StatItem
            icon={<Calendar className="h-4 w-4 text-primary" />}
            label="Appointments"
            value="12"
          />
          <StatItem
            icon={<Clock className="h-4 w-4 text-primary" />}
            label="Pending"
            value="3"
          />
          <StatItem
            icon={<Star className="h-4 w-4 text-primary" />}
            label="Reviews"
            value="8"
          />
        </div>
      </CardContent>
    </Card>
  );
}