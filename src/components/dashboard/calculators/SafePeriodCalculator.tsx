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
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">Fertile Window:</p>
            <p className="text-md text-muted-foreground">
              From: {fertileWindow.start}<br />
              To: {fertileWindow.end}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}