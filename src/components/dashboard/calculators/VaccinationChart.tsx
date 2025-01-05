import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addMonths } from "date-fns";
import { TooltipProvider } from "@/components/ui/tooltip";
import { VaccinationItem } from "./vaccination/VaccinationItem";
import { VaccinationSummary } from "./vaccination/VaccinationSummary";
import { defaultVaccinations } from "./vaccination/defaultVaccinations";

export default function VaccinationChart() {
  const [vaccinations, setVaccinations] = useState(defaultVaccinations);
  const [selectedChild, setSelectedChild] = useState("");
  const [childBirthDate, setChildBirthDate] = useState("");

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

  const updateDueDates = (birthDate: string) => {
    const birth = new Date(birthDate);
    setVaccinations(prev =>
      prev.map(v => {
        let dueDate = birth;
        switch(v.recommendedAge) {
          case "At birth":
            dueDate = birth;
            break;
          case "0-2 months":
            dueDate = addMonths(birth, 2);
            break;
          case "2 months":
            dueDate = addMonths(birth, 2);
            break;
          case "12 months":
            dueDate = addMonths(birth, 12);
            break;
          case "12-15 months":
            dueDate = addMonths(birth, 12);
            break;
          default:
            dueDate = birth;
        }
        return { ...v, dueDate: format(dueDate, 'yyyy-MM-dd') };
      })
    );
  };

  return (
    <Card className="p-6">
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="child">Child's Name</Label>
          <Input
            id="child"
            value={selectedChild}
            onChange={(e) => setSelectedChild(e.target.value)}
            placeholder="Enter child's name"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="birthdate">Date of Birth</Label>
          <Input
            id="birthdate"
            type="date"
            value={childBirthDate}
            onChange={(e) => {
              setChildBirthDate(e.target.value);
              updateDueDates(e.target.value);
            }}
            className="mt-1"
          />
        </div>
      </div>

      <TooltipProvider>
        <div className="space-y-4">
          {vaccinations.map((vaccination) => (
            <VaccinationItem
              key={vaccination.id}
              vaccination={vaccination}
              onDateChange={handleDateChange}
              onToggleComplete={toggleVaccination}
            />
          ))}
        </div>
      </TooltipProvider>

      <VaccinationSummary
        selectedChild={selectedChild}
        childBirthDate={childBirthDate}
        totalVaccinations={vaccinations.length}
        completedVaccinations={vaccinations.filter(v => v.completed).length}
        nextVaccinationName={vaccinations.find(v => !v.completed)?.name}
        nextVaccinationDate={vaccinations.find(v => !v.completed)?.dueDate}
      />
    </Card>
  );
}