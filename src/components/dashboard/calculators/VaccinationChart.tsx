import { useState } from "react";
import { Calendar, Syringe, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";

interface Vaccination {
  id: string;
  name: string;
  date: string;
  completed: boolean;
}

const defaultVaccinations: Vaccination[] = [
  { id: "1", name: "BCG", date: "", completed: false },
  { id: "2", name: "Hepatitis B", date: "", completed: false },
  { id: "3", name: "DTaP", date: "", completed: false },
  { id: "4", name: "IPV", date: "", completed: false },
  { id: "5", name: "Hib", date: "", completed: false },
  { id: "6", name: "MMR", date: "", completed: false },
  { id: "7", name: "Varicella", date: "", completed: false },
];

export default function VaccinationChart() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(defaultVaccinations);
  const [selectedChild, setSelectedChild] = useState("");

  const handleDateChange = (id: string, date: string) => {
    setVaccinations(prev =>
      prev.map(v =>
        v.id === id ? { ...v, date, completed: true } : v
      )
    );
  };

  const toggleVaccination = (id: string) => {
    setVaccinations(prev =>
      prev.map(v =>
        v.id === id ? { ...v, completed: !v.completed } : v
      )
    );
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <Label htmlFor="child">Select Child</Label>
        <Input
          id="child"
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
          placeholder="Enter child's name"
          className="mt-1"
        />
      </div>

      <div className="space-y-4">
        {vaccinations.map((vaccination) => (
          <div
            key={vaccination.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Syringe className="h-5 w-5 text-blue-500" />
              <span className="font-medium">{vaccination.name}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={vaccination.date}
                  onChange={(e) => handleDateChange(vaccination.id, e.target.value)}
                  className="w-40"
                />
              </div>

              <Button
                variant={vaccination.completed ? "default" : "outline"}
                size="sm"
                onClick={() => toggleVaccination(vaccination.id)}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                {vaccination.completed ? "Completed" : "Mark Complete"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedChild && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Summary for {selectedChild}</h3>
          <p className="text-sm text-gray-600">
            Completed: {vaccinations.filter(v => v.completed).length} of {vaccinations.length} vaccinations
          </p>
          <div className="mt-2 text-sm text-gray-600">
            Next scheduled: {
              vaccinations.find(v => !v.completed)?.name || "All vaccinations completed!"
            }
          </div>
        </div>
      )}
    </Card>
  );
}