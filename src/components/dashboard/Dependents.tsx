import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { DependentForm } from "./DependentForm";
import { DependentListItem } from "./DependentListItem";
import { supabase } from "@/integrations/supabase/client";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDependents();
  }, []);

  const fetchDependents = async () => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('dependents')
        .select('*')
        .eq('subscriber_id', user.user.id);

      if (error) throw error;

      const formattedDependents = data.map(dep => ({
        id: dep.id,
        name: `${dep.first_name} ${dep.last_name}`,
        relation: dep.relationship || '',
        age: calculateAge(dep.date_of_birth),
        gender: 'Not specified', // You might want to add this to the dependents table
        status: 'approved' as const // You might want to add this to the dependents table
      }));

      setDependents(formattedDependents);
    } catch (error) {
      console.error('Error fetching dependents:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch dependents. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dateOfBirth: string | null): string => {
    if (!dateOfBirth) return 'N/A';
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleAddDependent = async () => {
    if (newName && newRelation && newAge) {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user.user) throw new Error('No user found');

        const [firstName, ...lastNameParts] = newName.split(' ');
        const lastName = lastNameParts.join(' ');

        const { data, error } = await supabase
          .from('dependents')
          .insert({
            subscriber_id: user.user.id,
            first_name: firstName,
            last_name: lastName || '',
            relationship: newRelation,
            date_of_birth: new Date(new Date().setFullYear(new Date().getFullYear() - parseInt(newAge))).toISOString()
          })
          .select()
          .single();

        if (error) throw error;

        const newDependent: Dependent = {
          id: data.id,
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
          description: "New dependent has been added successfully.",
        });
      } catch (error) {
        console.error('Error adding dependent:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to add dependent. Please try again later.",
        });
      }
    }
  };

  const handleRemoveDependent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('dependents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setDependents(dependents.filter((dep) => dep.id !== id));
      toast({
        title: "Dependent Removed",
        description: "Dependent has been successfully removed.",
      });
    } catch (error) {
      console.error('Error removing dependent:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove dependent. Please try again later.",
      });
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    try {
      // Note: You might want to add a status column to the dependents table
      // and implement this update in the database
      setDependents(
        dependents.map((dep) =>
          dep.id === id ? { ...dep, status: newStatus } : dep
        )
      );
      toast({
        title: `Dependent ${newStatus === "approved" ? "Approved" : "Rejected"}`,
        description: `The dependent has been ${newStatus}.`,
      });
    } catch (error) {
      console.error('Error updating dependent status:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update dependent status. Please try again later.",
      });
    }
  };

  if (loading) {
    return <div>Loading dependents...</div>;
  }

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