import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MedicalHistoryFormProps {
  complaints: string;
  pastMedicalHistory: string;
  pastSurgicalHistory: string;
  drugAllergies: string;
  onChange: (field: string, value: string) => void;
}

export default function MedicalHistoryForm({
  complaints,
  pastMedicalHistory,
  pastSurgicalHistory,
  drugAllergies,
  onChange,
}: MedicalHistoryFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="complaints">Chief Complaints</Label>
        <Textarea
          id="complaints"
          placeholder="Enter patient's complaints..."
          value={complaints}
          onChange={(e) => onChange('complaints', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pastMedicalHistory">Past Medical History</Label>
        <Textarea
          id="pastMedicalHistory"
          placeholder="Enter past medical history..."
          value={pastMedicalHistory}
          onChange={(e) => onChange('pastMedicalHistory', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="pastSurgicalHistory">Past Surgical History</Label>
        <Textarea
          id="pastSurgicalHistory"
          placeholder="Enter past surgical history..."
          value={pastSurgicalHistory}
          onChange={(e) => onChange('pastSurgicalHistory', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="drugAllergies">Drug Allergies</Label>
        <Textarea
          id="drugAllergies"
          placeholder="Enter drug allergies..."
          value={drugAllergies}
          onChange={(e) => onChange('drugAllergies', e.target.value)}
        />
      </div>
    </div>
  );
}