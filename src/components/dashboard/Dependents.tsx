import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DependentForm } from "./DependentForm";
import { DependentListItem } from "./DependentListItem";

interface Dependent {
  id: string;
  name: string;
  relation: string;
  age: string;
  gender: string;
  status: "pending" | "approved" | "rejected";
}

export default function Dependents() {
  const { toast } = useToast();
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newGender, setNewGender] = useState("");

  const handleAddDependent = () => {
    if (newName && newRelation && newAge && newGender) {
      const newDependent: Dependent = {
        id: Date.now().toString(),
        name: newName,
        relation: newRelation,
        age: newAge,
        gender: newGender,
        status: "pending",
      };
      setDependents([...dependents, newDependent]);
      setNewName("");
      setNewRelation("");
      setNewAge("");
      setNewGender("");
      toast({
        title: "Dependent Added",
        description: "New dependent has been added and is pending approval.",
      });
    }
  };

  const handleRemoveDependent = (id: string) => {
    setDependents(dependents.filter((dep) => dep.id !== id));
    toast({
      title: "Dependent Removed",
      description: "Dependent has been successfully removed.",
    });
  };

  const handleUpdateStatus = (id: string, newStatus: "approved" | "rejected") => {
    setDependents(
      dependents.map((dep) =>
        dep.id === id ? { ...dep, status: newStatus } : dep
      )
    );
    toast({
      title: `Dependent ${newStatus === "approved" ? "Approved" : "Rejected"}`,
      description: `The dependent has been ${newStatus}.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <DependentForm
            newName={newName}
            setNewName={setNewName}
            newRelation={newRelation}
            setNewRelation={setNewRelation}
            newAge={newAge}
            setNewAge={setNewAge}
            newGender={newGender}
            setNewGender={setNewGender}
            onAdd={handleAddDependent}
          />
          <div className="space-y-2">
            {dependents.map((dependent) => (
              <DependentListItem
                key={dependent.id}
                dependent={dependent}
                onUpdateStatus={handleUpdateStatus}
                onRemove={handleRemoveDependent}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}