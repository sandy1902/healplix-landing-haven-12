import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Dependent {
  id: string;
  name: string;
  relation: string;
  status: "pending" | "approved" | "rejected";
}

interface PatientSelectorProps {
  selectedPatient: string;
  onPatientSelect: (value: string) => void;
  dependents: Dependent[];
}

export function PatientSelector({
  selectedPatient,
  onPatientSelect,
  dependents,
}: PatientSelectorProps) {
  return (
    <div className="mb-4">
      <Select value={selectedPatient} onValueChange={onPatientSelect}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select patient" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="self">Self</SelectItem>
          {dependents
            .filter((dep) => dep.status === "approved")
            .map((dependent) => (
              <SelectItem key={dependent.id} value={dependent.id}>
                {dependent.name} ({dependent.relation})
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  );
}