import { PatientSelector } from "@/components/dashboard/PatientSelector";

interface PatientSelectionSectionProps {
  selectedPatient: string;
  setSelectedPatient: (value: string) => void;
  dependents: Array<{ id: string; name: string; relation: string; status: "approved" }>;
}

export function PatientSelectionSection({
  selectedPatient,
  setSelectedPatient,
  dependents,
}: PatientSelectionSectionProps) {
  return (
    <div className="bg-accent rounded-lg p-3">
      <h3 className="text-lg font-semibold mb-2 text-primary">Select Patient</h3>
      <PatientSelector
        selectedPatient={selectedPatient}
        onPatientSelect={setSelectedPatient}
        dependents={dependents}
      />
    </div>
  );
}