import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type ProfileImageProps = {
  firstName: string;
};

export default function ProfileImage({ firstName }: ProfileImageProps) {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    if (showCamera && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [showCamera, stream]);

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
        setImagePreview(imageDataUrl);
        stopCamera();
        toast({
          title: "Photo Captured",
          description: "Your profile picture has been updated with the captured photo.",
        });
      }
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-32 w-32 border-4 border-secondary/20">
        <AvatarImage src={imagePreview || "/placeholder.svg"} className="object-cover" />
        <AvatarFallback className="bg-secondary/10 text-secondary text-2xl">
          {firstName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="absolute -bottom-3 -right-3 flex gap-2">
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="h-8 w-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => fileInputRef.current?.click()}
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
    </div>
  );
}