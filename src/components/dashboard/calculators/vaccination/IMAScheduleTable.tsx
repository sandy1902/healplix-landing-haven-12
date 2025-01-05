import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Info, Calendar, Syringe, Baby } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const vaccineSchedule = [
  {
    age: "At Birth",
    vaccines: ["BCG", "OPV-0", "Hepatitis B-1"],
    notes: "Should be given within 24 hours of birth"
  },
  {
    age: "6 Weeks",
    vaccines: ["DTwP-1", "IPV-1", "Hepatitis B-2", "Hib-1", "Rotavirus-1", "PCV-1"],
    notes: "First dose of primary vaccination series"
  },
  {
    age: "10 Weeks",
    vaccines: ["DTwP-2", "IPV-2", "Hib-2", "Rotavirus-2", "PCV-2"],
    notes: "Second dose of primary vaccination series"
  },
  {
    age: "14 Weeks",
    vaccines: ["DTwP-3", "IPV-3", "Hib-3", "Rotavirus-3", "PCV-3"],
    notes: "Third dose of primary vaccination series"
  },
  {
    age: "6 Months",
    vaccines: ["Hepatitis B-3"],
    notes: "Completes Hepatitis B series"
  },
  {
    age: "9 Months",
    vaccines: ["Measles-1", "PCV Booster"],
    notes: "First dose of Measles vaccine"
  },
  {
    age: "12 Months",
    vaccines: ["MMR-1"],
    notes: "Protects against Measles, Mumps, and Rubella"
  },
  {
    age: "15 Months",
    vaccines: ["Varicella-1"],
    notes: "Protects against Chickenpox"
  },
  {
    age: "16-18 Months",
    vaccines: ["DTwP-B1/DTaP-B1", "IPV-B1", "Hib-B1"],
    notes: "First booster dose"
  }
];

export function IMAScheduleTable() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h3 className="text-lg font-semibold">IMA Recommended Vaccination Schedule</h3>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-5 w-5 text-blue-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Indian Medical Association recommended schedule</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Age-based schedule</span>
        </div>
        <div className="flex items-center gap-2">
          <Syringe className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Required vaccines</span>
        </div>
        <div className="flex items-center gap-2">
          <Baby className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Child health</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] min-w-[100px]">Age</TableHead>
              <TableHead className="min-w-[200px]">Vaccines</TableHead>
              <TableHead className="min-w-[150px]">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vaccineSchedule.map((schedule, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium whitespace-nowrap">{schedule.age}</TableCell>
                <TableCell className="break-words">{schedule.vaccines.join(", ")}</TableCell>
                <TableCell className="text-muted-foreground break-words">{schedule.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-sm text-muted-foreground mt-4 px-2">
        Note: This schedule is based on IMA recommendations. Please consult with your pediatrician for personalized advice.
      </p>
    </div>
  );
}