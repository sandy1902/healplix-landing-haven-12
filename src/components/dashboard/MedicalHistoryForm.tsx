import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function MedicalHistoryForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState({
    chronic_diseases: "",
    allergies: "",
    drug_allergies: "",
    previous_surgeries: "",
  });

  useEffect(() => {
    fetchMedicalHistory();
  }, []);

  const fetchMedicalHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("medical_history")
        .select("*")
        .single();

      if (error) throw error;

      if (data) {
        setMedicalHistory({
          chronic_diseases: data.chronic_diseases || "",
          allergies: data.allergies || "",
          drug_allergies: data.drug_allergies || "",
          previous_surgeries: data.previous_surgeries || "",
        });
      }
    } catch (error) {
      console.error("Error fetching medical history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);

      const { data: existingRecord } = await supabase
        .from("medical_history")
        .select("id")
        .single();

      const payload = {
        ...medicalHistory,
        updated_at: new Date().toISOString(),
      };

      let error;
      if (existingRecord) {
        ({ error } = await supabase
          .from("medical_history")
          .update(payload)
          .eq("id", existingRecord.id));
      } else {
        ({ error } = await supabase
          .from("medical_history")
          .insert([payload]));
      }

      if (error) throw error;

      toast({
        title: "Success",
        description: "Medical history has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating medical history:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update medical history. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof medicalHistory, value: string) => {
    setMedicalHistory(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="chronic_diseases">Chronic Diseases</Label>
              <Textarea
                id="chronic_diseases"
                placeholder="List any chronic diseases..."
                value={medicalHistory.chronic_diseases}
                onChange={(e) => handleChange("chronic_diseases", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                placeholder="List any allergies..."
                value={medicalHistory.allergies}
                onChange={(e) => handleChange("allergies", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="drug_allergies">Drug Allergies</Label>
              <Textarea
                id="drug_allergies"
                placeholder="List any drug allergies..."
                value={medicalHistory.drug_allergies}
                onChange={(e) => handleChange("drug_allergies", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="previous_surgeries">Previous Surgeries</Label>
              <Textarea
                id="previous_surgeries"
                placeholder="List any previous surgeries..."
                value={medicalHistory.previous_surgeries}
                onChange={(e) => handleChange("previous_surgeries", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}