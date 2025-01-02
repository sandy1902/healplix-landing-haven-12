import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DependentFormProps {
  newName: string;
  setNewName: (value: string) => void;
  newRelation: string;
  setNewRelation: (value: string) => void;
  newAge: string;
  setNewAge: (value: string) => void;
  newGender: string;
  setNewGender: (value: string) => void;
  onAdd: () => void;
}

export function DependentForm({
  newName,
  setNewName,
  newRelation,
  setNewRelation,
  newAge,
  setNewAge,
  newGender,
  setNewGender,
  onAdd,
}: DependentFormProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <Input
        placeholder="Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <Select value={newRelation} onValueChange={setNewRelation}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select relation" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="spouse">Spouse</SelectItem>
          <SelectItem value="child">Child</SelectItem>
          <SelectItem value="mother">Mother</SelectItem>
          <SelectItem value="father">Father</SelectItem>
        </SelectContent>
      </Select>
      <Input
        placeholder="Age"
        type="number"
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />
      <Select value={newGender} onValueChange={setNewGender}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select gender" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          <SelectItem value="male">Male</SelectItem>
          <SelectItem value="female">Female</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={onAdd}>
        <UserPlus className="h-4 w-4 mr-2" />
        Add
      </Button>
    </div>
  );
}