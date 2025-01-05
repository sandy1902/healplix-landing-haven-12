import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, Info, Syringe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VaccinationItemProps {
  vaccination: {
    id: string;
    name: string;
    date: string;
    completed: boolean;
    recommendedAge: string;
    dueDate: string;
  };
  onDateChange: (id: string, date: string) => void;
  onToggleComplete: (id: string) => void;
}

export function VaccinationItem({
  vaccination,
  onDateChange,
  onToggleComplete,
}: VaccinationItemProps) {
  return (
    <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3">
        <Syringe className="h-5 w-5 text-blue-500 flex-shrink-0" />
        <div>
          <span className="font-medium">{vaccination.name}</span>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 ml-2 text-gray-400 inline" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Recommended age: {vaccination.recommendedAge}</p>
              <p>Due date: {vaccination.dueDate}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Calendar className="h-4 w-4 text-gray-500 flex-shrink-0" />
          <Input
            type="date"
            value={vaccination.date}
            onChange={(e) => onDateChange(vaccination.id, e.target.value)}
            className="w-full sm:w-40"
          />
        </div>

        <Button
          variant={vaccination.completed ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleComplete(vaccination.id)}
          className="gap-2 w-full sm:w-auto"
        >
          <Check className="h-4 w-4" />
          {vaccination.completed ? "Completed" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
}