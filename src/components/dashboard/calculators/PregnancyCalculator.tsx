import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { addDays, differenceInWeeks } from "date-fns";

export default function PregnancyCalculator() {
  const [lastPeriod, setLastPeriod] = useState("");
  const [dueDate, setDueDate] = useState<string | null>(null);
  const [weeksPregnant, setWeeksPregnant] = useState<number | null>(null);

  const calculateDueDate = () => {
    if (lastPeriod) {
      const lmpDate = new Date(lastPeriod);
      const calculatedDueDate = addDays(lmpDate, 280); // 40 weeks
      const today = new Date();
      const currentWeeks = differenceInWeeks(today, lmpDate);
      
      setDueDate(calculatedDueDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }));
      setWeeksPregnant(currentWeeks);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pregnancy Due Date Calculator</CardTitle>
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
        <Button onClick={calculateDueDate} className="w-full">Calculate Due Date</Button>
        {dueDate && (
          <div className="mt-4 space-y-2">
            <div className="text-center">
              <p className="text-lg font-semibold">Estimated Due Date:</p>
              <p className="text-md text-muted-foreground">{dueDate}</p>
            </div>
            {weeksPregnant !== null && weeksPregnant >= 0 && (
              <div className="text-center">
                <p className="text-lg font-semibold">Current Progress:</p>
                <p className="text-md text-muted-foreground">
                  {weeksPregnant} weeks pregnant
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}