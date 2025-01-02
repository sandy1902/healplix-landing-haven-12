import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import GeneralExaminationForm from "./GeneralExaminationForm";
import MedicalHistoryForm from "./MedicalHistoryForm";
import { PrescriptionData } from "../types/prescription";

export default function Prescription() {
  const { toast } = useToast();
  const [prescription, setPrescription] = useState<PrescriptionData>({
    complaints: "",
    pastMedicalHistory: "",
    pastSurgicalHistory: "",
    drugAllergies: "",
    generalExamination: {
      pr: "",
      bp: "",
      temperature: "",
      cvs: "",
      rs: "",
      perAbdomen: "",
    },
    impression: "",
    investigations: "",
    medicines: "",
    dosage: "",
    duration: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPrescription((prev: PrescriptionData) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setPrescription((prev: PrescriptionData) => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Prescription Saved",
      description: "The prescription has been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write Prescription</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <MedicalHistoryForm
            complaints={prescription.complaints}
            pastMedicalHistory={prescription.pastMedicalHistory}
            pastSurgicalHistory={prescription.pastSurgicalHistory}
            drugAllergies={prescription.drugAllergies}
            onChange={handleChange}
          />

          <GeneralExaminationForm
            data={prescription.generalExamination}
            onChange={handleChange}
          />

          <div className="space-y-2">
            <Label htmlFor="impression">Impression</Label>
            <Textarea
              id="impression"
              placeholder="Enter impression..."
              value={prescription.impression}
              onChange={(e) => handleChange('impression', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="investigations">Investigations</Label>
            <Textarea
              id="investigations"
              placeholder="Enter required investigations..."
              value={prescription.investigations}
              onChange={(e) => handleChange('investigations', e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicines">Medicines</Label>
            <Textarea
              id="medicines"
              placeholder="Enter medicines..."
              value={prescription.medicines}
              onChange={(e) => handleChange('medicines', e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dosage">Dosage</Label>
              <Input
                id="dosage"
                placeholder="e.g., 1-0-1"
                value={prescription.dosage}
                onChange={(e) => handleChange('dosage', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 7 days"
                value={prescription.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              placeholder="Any additional instructions..."
              value={prescription.notes}
              onChange={(e) => handleChange('notes', e.target.value)}
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              type="button" 
              onClick={() => setPrescription({
                complaints: "",
                pastMedicalHistory: "",
                pastSurgicalHistory: "",
                drugAllergies: "",
                generalExamination: {
                  pr: "",
                  bp: "",
                  temperature: "",
                  cvs: "",
                  rs: "",
                  perAbdomen: "",
                },
                impression: "",
                investigations: "",
                medicines: "",
                dosage: "",
                duration: "",
                notes: "",
              })}
            >
              Clear
            </Button>
            <Button type="submit">Save Prescription</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}