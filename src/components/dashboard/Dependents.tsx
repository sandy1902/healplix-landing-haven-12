import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, X } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Dependent {
  id: string;
  name: string;
  relation: string;
}

export default function Dependents() {
  const { toast } = useToast();
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [newName, setNewName] = useState("");
  const [newRelation, setNewRelation] = useState("");

  const handleAddDependent = () => {
    if (newName && newRelation) {
      const newDependent: Dependent = {
        id: Date.now().toString(),
        name: newName,
        relation: newRelation,
      };
      setDependents([...dependents, newDependent]);
      setNewName("");
      setNewRelation("");
      toast({
        title: "Dependent Added",
        description: "New dependent has been successfully added.",
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dependents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <Input
              placeholder="Relation"
              value={newRelation}
              onChange={(e) => setNewRelation(e.target.value)}
            />
            <Button onClick={handleAddDependent}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="space-y-2">
            {dependents.map((dependent) => (
              <div
                key={dependent.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{dependent.name}</p>
                  <p className="text-sm text-gray-500">{dependent.relation}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveDependent(dependent.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}