import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CameraCapture } from "./CameraCapture";

interface MedicalRecordsUploadProps {
  onFileSelect: (file: File) => void;
}

export function MedicalRecordsUpload({ onFileSelect }: MedicalRecordsUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
      toast({
        title: "File Selected",
        description: "Medical record has been uploaded successfully.",
      });
    }
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    // Convert base64 to file
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
        onFileSelect(file);
        setShowCamera(false);
      });
  };

  return (
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
            Upload Medical Records
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border border-gray-200 hover:bg-accent/50 transition-colors"
            onClick={() => setShowCamera(true)}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showCamera && (
        <CameraCapture
          onPhotoCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  );
}