import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileSummary() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<{
    first_name: string;
    email: string;
  }>({ first_name: "", email: "" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get the current user's session
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          // Get the user's profile data
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .single();

          setUserProfile({
            first_name: profile?.first_name || "User",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      }
    };

    fetchUserProfile();
  }, [toast]);

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
    <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
      <div className="relative">
        <Avatar className="h-32 w-32 border-4 border-secondary/20">
          <AvatarImage src={imagePreview || "/placeholder.svg"} className="object-cover" />
          <AvatarFallback className="bg-secondary/10 text-secondary text-2xl">
            {userProfile.first_name.charAt(0).toUpperCase()}
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
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {userProfile.first_name}
        </h1>
        <p className="text-gray-500 mt-1">{userProfile.email}</p>
      </div>
    </div>
  );
}
