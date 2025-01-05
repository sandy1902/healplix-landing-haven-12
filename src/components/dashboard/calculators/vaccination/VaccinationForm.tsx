import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VaccinationFormProps {
  selectedChild: string;
  childBirthDate: string;
  onChildNameChange: (name: string) => void;
  onBirthDateChange: (date: string) => void;
}

export function VaccinationForm({
  selectedChild,
  childBirthDate,
  onChildNameChange,
  onBirthDateChange,
}: VaccinationFormProps) {
  return (
    <div className="space-y-4 mb-6">
      <div>
        <Label htmlFor="child">Child's Name</Label>
        <Input
          id="child"
          value={selectedChild}
          onChange={(e) => onChildNameChange(e.target.value)}
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
          onChange={(e) => onBirthDateChange(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  );
}