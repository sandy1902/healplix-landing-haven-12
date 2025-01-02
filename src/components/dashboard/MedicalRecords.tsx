import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Upload, Camera } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

interface MedicalRecord {
  id: string;
  name: string;
  date: string;
  type: string;
  size: string;
}

export default function MedicalRecords() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
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
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        
        // Convert base64 to blob
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
            stopCamera();
            toast({
              title: "Photo Captured",
              description: "Your medical record has been captured successfully.",
            });
          });
      }
    }
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
          <Button variant="secondary" onClick={startCamera}>
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
        {records.length > 0 ? (
          <div className="space-y-4">
            {records.map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <FileText className="h-6 w-6 text-secondary" />
                  <div>
                    <h3 className="font-semibold">{record.name}</h3>
                    <p className="text-sm text-gray-500">
                      Uploaded on {record.date} • {record.type} • {record.size}
                    </p>
                  </div>
                </div>
                <Button variant="outline" onClick={() => handleDownload(record)}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No medical records uploaded</p>
        )}

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
      </CardContent>
    </Card>
  );
}