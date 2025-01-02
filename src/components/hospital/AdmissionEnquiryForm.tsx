import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Admission Enquiry - {hospitalName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Patient</Label>
              <PatientSelector
                selectedPatient={selectedPatient}
                onPatientSelect={setSelectedPatient}
                dependents={[]}
              />
            </div>

            <div>
              <Label htmlFor="diagnosis">Diagnosis/Symptoms</Label>
              <Textarea
                id="diagnosis"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="Please describe the diagnosis or symptoms"
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="insurance">Insurance Provider</Label>
              <Select value={insuranceProvider} onValueChange={setInsuranceProvider}>
                <SelectTrigger>
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

            <div>
              <Label htmlFor="admissionType">Admission Type</Label>
              <Select value={admissionType} onValueChange={setAdmissionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select admission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="elective">Elective</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Medical Records</Label>
              <div className="mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {selectedFile ? selectedFile.name : "Upload Medical Records"}
                </Button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Enquiry</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}