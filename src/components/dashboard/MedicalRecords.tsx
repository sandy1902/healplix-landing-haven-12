import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CameraModal } from "./CameraModal";
import { RecordsList } from "./RecordsList";
import { MedicalRecord } from "./types";
import { UploadButtons } from "./medical-records/UploadButtons";

export default function MedicalRecords() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
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

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false 
      });
      
      setStream(mediaStream);
      setShowCamera(true);
      
      toast({
        title: "Camera Started",
        description: "Camera is now active. Click 'Capture' to take a photo.",
      });
    } catch (err) {
      console.error('Camera error:', err);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
      });
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
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setShowCamera(false);
  };

  const handleDownload = (record: MedicalRecord) => {
    toast({
      title: "Download Started",
      description: `Downloading ${record.name}...`,
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <CardTitle className="text-center sm:text-left">Medical Records</CardTitle>
        <UploadButtons 
          onUploadClick={handleUploadClick}
          onCameraClick={startCamera}
        />
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
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
          />
        )}
      </CardContent>
    </Card>
  );
}