import { useState } from "react";
import { Calendar, Syringe, Check, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { format, addMonths } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Vaccination {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  recommendedAge: string;
  dueDate: string;
}

const defaultVaccinations: Vaccination[] = [
  { 
    id: "1", 
    name: "BCG", 
    date: "", 
    completed: false,
    recommendedAge: "At birth",
    dueDate: format(new Date(), 'yyyy-MM-dd')
  },
  { 
    id: "2", 
    name: "Hepatitis B", 
    date: "", 
    completed: false,
    recommendedAge: "0-2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "3", 
    name: "DTaP", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "4", 
    name: "IPV", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "5", 
    name: "Hib", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "6", 
    name: "MMR", 
    date: "", 
    completed: false,
    recommendedAge: "12 months",
    dueDate: format(addMonths(new Date(), 12), 'yyyy-MM-dd')
  },
  { 
    id: "7", 
    name: "Varicella", 
    date: "", 
    completed: false,
    recommendedAge: "12-15 months",
    dueDate: format(addMonths(new Date(), 12), 'yyyy-MM-dd')
  },
];

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

      <div className="space-y-4">
        {vaccinations.map((vaccination) => (
          <div
            key={vaccination.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <Syringe className="h-5 w-5 text-blue-500" />
              <div>
                <span className="font-medium">{vaccination.name}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 ml-2 text-gray-400 inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Recommended age: {vaccination.recommendedAge}</p>
                      <p>Due date: {vaccination.dueDate}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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

      {selectedChild && childBirthDate && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">Summary for {selectedChild}</h3>
          <p className="text-sm text-gray-600">
            Completed: {vaccinations.filter(v => v.completed).length} of {vaccinations.length} vaccinations
          </p>
          <div className="mt-2 text-sm text-gray-600">
            Next due: {
              vaccinations.find(v => !v.completed)?.name || "All vaccinations completed!"
            }
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Next vaccination due date: {
              vaccinations.find(v => !v.completed)?.dueDate || "N/A"
            }
          </div>
        </div>
      )}
    </Card>
  );
}