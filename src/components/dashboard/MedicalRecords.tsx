import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CameraModal } from "./CameraModal";
import { RecordsList } from "./RecordsList";
import { MedicalRecord } from "./types";
import { useCamera } from "@/hooks/useCamera";

export default function MedicalRecords() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { stream, startCamera, stopCamera, toggleFacingMode } = useCamera();
  const [records, setRecords] = useState<MedicalRecord[]>([
    {
      id: "1",
      name: "Blood Test Results",
      date: "2024-02-15",
      type: "PDF",
      size: "2.5 MB"
    },
    {
      id: "2",
      name: "X-Ray Report",
      date: "2024-01-20",
      type: "PDF",
      size: "5.1 MB"
    }
  ]);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newRecord: MedicalRecord = {
        id: Date.now().toString(),
        name: file.name,
        date: new Date().toISOString().split('T')[0],
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      };
      
      setRecords([...records, newRecord]);
      toast({
        title: "File Upload Successful",
        description: "Your medical record has been successfully uploaded.",
      });
      
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const handleStartCamera = async () => {
    const mediaStream = await startCamera();
    if (mediaStream) {
      setShowCamera(true);
    }
  };

  const handleCameraCapture = (imageDataUrl: string) => {
    fetch(imageDataUrl)
      .then(res => res.blob())
      .then(blob => {
        const file = new File([blob], `captured-image-${Date.now()}.jpg`, { type: 'image/jpeg' });
        const newRecord: MedicalRecord = {
          id: Date.now().toString(),
          name: file.name,
          date: new Date().toISOString().split('T')[0],
          type: 'JPG',
          size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        };
        
        setRecords([...records, newRecord]);
        handleCloseCamera();
        toast({
          title: "Photo Captured",
          description: "Your medical record has been captured successfully.",
        });
      });
  };

  const handleCloseCamera = () => {
    stopCamera();
    setShowCamera(false);
  };

  const handleDownload = (record: MedicalRecord) => {
    toast({
      title: "Download Started",
      description: `Downloading ${record.name}...`,
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Medical Records</CardTitle>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleUploadClick}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Record
          </Button>
          <Button variant="secondary" onClick={handleStartCamera}>
            <Camera className="h-4 w-4 mr-2" />
            Capture Image
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          onChange={handleFileUpload}
        />
        <RecordsList records={records} onDownload={handleDownload} />
        {showCamera && (
          <CameraModal
            stream={stream}
            onCapture={handleCameraCapture}
            onClose={handleCloseCamera}
            onToggleCamera={toggleFacingMode}
          />
        )}
      </CardContent>
    </Card>
  );
}