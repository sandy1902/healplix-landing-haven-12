import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";

export default function SafePeriodCalculator() {
  const [cycleLength, setCycleLength] = useState("28");
  const [lastPeriod, setLastPeriod] = useState("");
  const [fertileWindow, setFertileWindow] = useState<{ start: string; end: string } | null>(null);

  const calculateFertileWindow = () => {
    if (lastPeriod && cycleLength) {
      const cycle = parseInt(cycleLength);
      const lmpDate = new Date(lastPeriod);
      
      // Fertile window typically starts 5 days before ovulation
      const ovulationDay = cycle - 14;
      const fertileStart = addDays(lmpDate, ovulationDay - 5);
      const fertileEnd = addDays(lmpDate, ovulationDay + 1);

      setFertileWindow({
        start: format(fertileStart, 'MMMM dd, yyyy'),
        end: format(fertileEnd, 'MMMM dd, yyyy')
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Safe Period Calculator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="lastPeriod">First Day of Last Period</Label>
          <Input
            id="lastPeriod"
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cycleLength">Menstrual Cycle Length (days)</Label>
          <Input
            id="cycleLength"
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            min="21"
            max="35"
          />
        </div>
        <Button onClick={calculateFertileWindow} className="w-full">Calculate Fertile Window</Button>
        {fertileWindow && (
          <div className="mt-4 space-y-2">
            <div className="text-center p-4 rounded-lg bg-[#F2FCE2]">
              <p className="text-lg font-semibold text-[#0EA5E9]">Fertile Window Start:</p>
              <p className="text-md font-medium text-[#1A1F2C]">{fertileWindow.start}</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-[#D3E4FD]">
              <p className="text-lg font-semibold text-[#0EA5E9]">Fertile Window End:</p>
              <p className="text-md font-medium text-[#1A1F2C]">{fertileWindow.end}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}