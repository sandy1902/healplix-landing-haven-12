import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";

export default function ProfileSummary() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: "Please upload an image file.",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast({
          title: "Profile Picture Updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
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
      
      toast({
        title: "Camera Started",
        description: "Camera is now active. Click 'Capture' to take a photo.",
      });
    } catch (err) {
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
        setImagePreview(imageDataUrl);
        stopCamera();
        toast({
          title: "Photo Captured",
          description: "Your profile picture has been updated with the captured photo.",
        });
      }
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-secondary/20">
          <AvatarImage src={imagePreview || "/placeholder.svg"} className="object-cover" />
          <AvatarFallback className="bg-secondary/10 text-secondary text-2xl">UN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-3 -right-3 flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={handleUploadClick}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={showCamera ? stopCamera : startCamera}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      
      {showCamera && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full rounded-lg mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={stopCamera}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={capturePhoto}
                className="w-full md:w-auto"
              >
                Capture Photo
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-primary">Welcome, User Name</h1>
        <p className="text-gray-500 mt-1">user@example.com</p>
      </div>
    </div>
  );
}