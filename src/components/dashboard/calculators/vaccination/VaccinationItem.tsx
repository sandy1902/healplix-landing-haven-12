import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Check, Info, Syringe } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
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
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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
            onChange={(e) => onDateChange(vaccination.id, e.target.value)}
            className="w-40"
          />
        </div>

        <Button
          variant={vaccination.completed ? "default" : "outline"}
          size="sm"
          onClick={() => onToggleComplete(vaccination.id)}
          className="gap-2"
        >
          <Check className="h-4 w-4" />
          {vaccination.completed ? "Completed" : "Mark Complete"}
        </Button>
      </div>
    </div>
  );
}