import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Doctor } from "@/types/doctor";

interface ConsultationTypeSectionProps {
  consultationType: string;
  setConsultationType: (value: string) => void;
  doctor: Doctor;
}

export function ConsultationTypeSection({
  consultationType,
  setConsultationType,
  doctor,
}: ConsultationTypeSectionProps) {
  return (
    <div className="bg-accent rounded-lg p-3">
      <h3 className="text-lg font-semibold mb-2 text-primary">Consultation Type</h3>
      <Select value={consultationType} onValueChange={setConsultationType}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select consultation type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="clinic">Clinic Visit (₹{doctor.clinicVisit.charges})</SelectItem>
          <SelectItem value="video">Video Consultation (₹{doctor.videoConsultation.charges})</SelectItem>
          <SelectItem value="followup">Follow-up Visit (₹500)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}