import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format, addMonths } from "date-fns";
import { VaccinationForm } from "./VaccinationForm";
import { VaccinationItem } from "./VaccinationItem";
import { VaccinationSummary } from "./VaccinationSummary";
import { defaultVaccinations, type Vaccination } from "./defaultVaccinations";

export default function VaccinationChart() {
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(defaultVaccinations);
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

  const handleBirthDateChange = (date: string) => {
    setChildBirthDate(date);
    updateDueDates(date);
  };

  const completedVaccinations = vaccinations.filter(v => v.completed).length;
  const nextVaccination = vaccinations.find(v => !v.completed);

  return (
    <Card className="p-6">
      <VaccinationForm
        selectedChild={selectedChild}
        childBirthDate={childBirthDate}
        onChildNameChange={setSelectedChild}
        onBirthDateChange={handleBirthDateChange}
      />

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

      <VaccinationSummary
        selectedChild={selectedChild}
        childBirthDate={childBirthDate}
        totalVaccinations={vaccinations.length}
        completedVaccinations={completedVaccinations}
        nextVaccinationName={nextVaccination?.name}
        nextVaccinationDate={nextVaccination?.dueDate}
      />
    </Card>
  );
}