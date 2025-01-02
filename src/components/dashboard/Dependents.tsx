import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, X, Check, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

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
        status: "pending"
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

  // This would typically be handled by an admin/doctor
  const handleUpdateStatus = (id: string, newStatus: "approved" | "rejected") => {
    setDependents(dependents.map(dep => 
      dep.id === id ? { ...dep, status: newStatus } : dep
    ));
    toast({
      title: `Dependent ${newStatus === 'approved' ? 'Approved' : 'Rejected'}`,
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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
            <Input
              placeholder="Age"
              type="number"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={newGender}
              onChange={(e) => setNewGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
                  <div className="text-sm text-gray-500">
                    <p>{dependent.relation} • {dependent.age} years • {dependent.gender}</p>
                    <p className={`mt-1 ${
                      dependent.status === 'approved' ? 'text-green-500' : 
                      dependent.status === 'rejected' ? 'text-red-500' : 
                      'text-yellow-500'
                    }`}>
                      Status: {dependent.status.charAt(0).toUpperCase() + dependent.status.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {dependent.status === 'pending' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(dependent.id, 'approved')}
                        className="text-green-500"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUpdateStatus(dependent.id, 'rejected')}
                        className="text-red-500"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveDependent(dependent.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}