import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function Prescription() {
  const { toast } = useToast();
  const [prescription, setPrescription] = useState({
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
    medicines: "",
    dosage: "",
    duration: "",
    notes: "",
  });

  const handleChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setPrescription(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setPrescription(prev => ({
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
          {/* Chief Complaints */}
          <div className="space-y-2">
            <Label htmlFor="complaints">Chief Complaints</Label>
            <Textarea
              id="complaints"
              placeholder="Enter patient's complaints..."
              value={prescription.complaints}
              onChange={(e) => handleChange('complaints', e.target.value)}
            />
          </div>

          {/* Medical History */}
          <div className="space-y-2">
            <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
            <Textarea
              id="pastMedicalHistory"
              placeholder="Enter past medical history..."
              value={prescription.pastMedicalHistory}
              onChange={(e) => handleChange('pastMedicalHistory', e.target.value)}
            />
          </div>

          {/* Surgical History */}
          <div className="space-y-2">
            <Label htmlFor="pastSurgicalHistory">Past Surgical History</Label>
            <Textarea
              id="pastSurgicalHistory"
              placeholder="Enter past surgical history..."
              value={prescription.pastSurgicalHistory}
              onChange={(e) => handleChange('pastSurgicalHistory', e.target.value)}
            />
          </div>

          {/* Drug Allergies */}
          <div className="space-y-2">
            <Label htmlFor="drugAllergies">Drug Allergies</Label>
            <Textarea
              id="drugAllergies"
              placeholder="Enter drug allergies..."
              value={prescription.drugAllergies}
              onChange={(e) => handleChange('drugAllergies', e.target.value)}
            />
          </div>

          {/* General Examination */}
          <div className="space-y-4">
            <h3 className="font-semibold">General Examination</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pr">Pulse Rate</Label>
                <Input
                  id="pr"
                  placeholder="PR"
                  value={prescription.generalExamination.pr}
                  onChange={(e) => handleChange('generalExamination.pr', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bp">Blood Pressure</Label>
                <Input
                  id="bp"
                  placeholder="BP"
                  value={prescription.generalExamination.bp}
                  onChange={(e) => handleChange('generalExamination.bp', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature</Label>
                <Input
                  id="temperature"
                  placeholder="Temperature"
                  value={prescription.generalExamination.temperature}
                  onChange={(e) => handleChange('generalExamination.temperature', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvs">CVS</Label>
                <Input
                  id="cvs"
                  placeholder="CVS"
                  value={prescription.generalExamination.cvs}
                  onChange={(e) => handleChange('generalExamination.cvs', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rs">RS</Label>
                <Input
                  id="rs"
                  placeholder="RS"
                  value={prescription.generalExamination.rs}
                  onChange={(e) => handleChange('generalExamination.rs', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="perAbdomen">Per Abdomen</Label>
                <Input
                  id="perAbdomen"
                  placeholder="Per Abdomen"
                  value={prescription.generalExamination.perAbdomen}
                  onChange={(e) => handleChange('generalExamination.perAbdomen', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Impression */}
          <div className="space-y-2">
            <Label htmlFor="impression">Impression</Label>
            <Textarea
              id="impression"
              placeholder="Enter impression..."
              value={prescription.impression}
              onChange={(e) => handleChange('impression', e.target.value)}
            />
          </div>

          {/* Medicines */}
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