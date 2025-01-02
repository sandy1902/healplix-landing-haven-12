import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PatientSelector } from "@/components/dashboard/PatientSelector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { MedicalRecordsUpload } from "./MedicalRecordsUpload";

interface AdmissionEnquiryFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospitalName: string;
  insuranceProviders: string[];
}

export function AdmissionEnquiryForm({
  open,
  onOpenChange,
  hospitalName,
  insuranceProviders,
}: AdmissionEnquiryFormProps) {
  const { toast } = useToast();
  const [selectedPatient, setSelectedPatient] = useState("self");
  const [diagnosis, setDiagnosis] = useState("");
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [admissionType, setAdmissionType] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Dummy dependents data
  const dependents = [
    { id: "1", name: "Sarah Smith", relation: "Spouse", status: "approved" as const },
    { id: "2", name: "Tommy Smith", relation: "Son", status: "approved" as const },
    { id: "3", name: "Emily Smith", relation: "Daughter", status: "approved" as const },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Enquiry Submitted Successfully",
      description: "We will review your details and get back to you shortly.",
    });
    onOpenChange(false);
    // Reset form
    setDiagnosis("");
    setInsuranceProvider("");
    setAdmissionType("");
    setSelectedFile(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-primary bg-accent/50 p-4 rounded-lg">
            Admission Enquiry - {hospitalName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="form-float">
              <Label className="text-sm font-semibold mb-2 block text-primary">Enquiry for</Label>
              <PatientSelector
                selectedPatient={selectedPatient}
                onPatientSelect={setSelectedPatient}
                dependents={dependents}
              />
            </div>

            <div className="form-float">
              <Label htmlFor="diagnosis" className="text-sm font-semibold mb-2 block text-primary">
                Diagnosis/Symptoms
              </Label>
              <Textarea
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Please describe the diagnosis or symptoms"
                className="min-h-[100px] w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary resize-none"
              />
            </div>

            <div className="form-float">
              <Label htmlFor="insurance" className="text-sm font-semibold mb-2 block text-primary">
                Insurance Provider
              </Label>
              <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                <SelectTrigger className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary">
                  <SelectValue placeholder="Select insurance provider" />
                </SelectTrigger>
                <SelectContent>
                  {insuranceProviders.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="form-float">
              <Label htmlFor="admissionType" className="text-sm font-semibold mb-2 block text-primary">
                Admission Type
              </Label>
              <Select value={admissionType} onValueChange={setAdmissionType}>
                <SelectTrigger className="w-full border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/50 focus:border-secondary">
                  <SelectValue placeholder="Select admission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <MedicalRecordsUpload onFileSelect={setSelectedFile} />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Submit Enquiry
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}