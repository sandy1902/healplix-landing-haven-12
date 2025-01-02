import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload } from "lucide-react";

export default function ExecutiveProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [profile, setProfile] = useState({
    name: "John Executive",
    email: "john@executive.com",
    phone: "+1 234 567 8900",
    company: "Health Solutions Inc.",
    position: "Senior Executive",
    bio: "Healthcare executive with 10+ years of experience"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

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
          title: "Image Uploaded",
          description: "Your profile picture has been updated.",
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
    const videoElement = document.querySelector('video');
    if (videoElement) {
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoElement, 0, 0);
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Executive Profile
          <Button 
            variant={isEditing ? "default" : "secondary"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={imagePreview || "/placeholder.svg"} />
              <AvatarFallback>JE</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-2 -right-2 flex gap-2">
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full"
                onClick={() => document.getElementById('avatar-upload')?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                size="icon"
                variant="secondary"
                className="h-8 w-8 rounded-full"
                onClick={showCamera ? stopCamera : startCamera}
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.position}</p>
          </div>
        </div>

        {showCamera && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
              <video
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              disabled={!isEditing}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={!isEditing}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}