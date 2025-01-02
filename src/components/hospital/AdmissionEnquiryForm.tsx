import { useState, useRef } from "react";
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
import { Camera, Upload } from "lucide-react";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" },
        audio: false 
      });
      setStream(mediaStream);
      setShowCamera(true);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
            setSelectedFile(file);
          }
        }, 'image/jpeg');
        stopCamera();
      }
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
      <DialogContent className="sm:max-w-[600px] bg-white p-6 rounded-lg shadow-xl">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-2xl font-bold text-primary bg-accent/50 p-4 rounded-lg">
            Admission Enquiry - {hospitalName}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="form-float">
              <Label className="text-sm font-semibold mb-2 block text-primary">Patient</Label>
              <PatientSelector
                selectedPatient={selectedPatient}
                onPatientSelect={setSelectedPatient}
                dependents={[]}
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

            <div className="form-float">
              <Label className="text-sm font-semibold mb-2 block text-primary">Medical Records</Label>
              <div className="mt-2 space-y-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full border border-gray-200 hover:bg-accent/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {selectedFile ? selectedFile.name : "Upload Medical Records"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border border-gray-200 hover:bg-accent/50 transition-colors"
                    onClick={showCamera ? stopCamera : startCamera}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {showCamera && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-[400px] rounded-lg mb-4 object-cover"
                />
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={stopCamera}>Cancel</Button>
                  <Button onClick={capturePhoto}>Capture Photo</Button>
                </div>
              </div>
            </div>
          )}

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