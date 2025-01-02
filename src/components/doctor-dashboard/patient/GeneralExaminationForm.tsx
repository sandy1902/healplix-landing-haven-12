import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GeneralExamination } from "../types/prescription";

interface GeneralExaminationFormProps {
  data: GeneralExamination;
  onChange: (field: string, value: string) => void;
}

export default function GeneralExaminationForm({ data, onChange }: GeneralExaminationFormProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">General Examination</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pr">Pulse Rate</Label>
          <Input
            id="pr"
            placeholder="PR"
            value={data.pr}
            onChange={(e) => onChange('generalExamination.pr', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bp">Blood Pressure</Label>
          <Input
            id="bp"
            placeholder="BP"
            value={data.bp}
            onChange={(e) => onChange('generalExamination.bp', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="temperature">Temperature</Label>
          <Input
            id="temperature"
            placeholder="Temperature"
            value={data.temperature}
            onChange={(e) => onChange('generalExamination.temperature', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cvs">CVS</Label>
          <Input
            id="cvs"
            placeholder="CVS"
            value={data.cvs}
            onChange={(e) => onChange('generalExamination.cvs', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rs">RS</Label>
          <Input
            id="rs"
            placeholder="RS"
            value={data.rs}
            onChange={(e) => onChange('generalExamination.rs', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="perAbdomen">Per Abdomen</Label>
          <Input
            id="perAbdomen"
            placeholder="Per Abdomen"
            value={data.perAbdomen}
            onChange={(e) => onChange('generalExamination.perAbdomen', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}