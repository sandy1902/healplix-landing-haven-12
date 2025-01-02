import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, X, Check, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
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