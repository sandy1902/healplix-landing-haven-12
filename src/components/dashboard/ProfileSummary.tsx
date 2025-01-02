import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useRef } from "react";

export default function ProfileSummary() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

  const handleCameraClick = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center gap-4 py-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src={imagePreview || "/placeholder.svg"} />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 flex gap-2">
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={handleUploadClick}
          >
            <Upload className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="secondary"
            className="h-8 w-8 rounded-full"
            onClick={handleCameraClick}
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
        <input
          type="file"
          ref={cameraInputRef}
          className="hidden"
          accept="image/*"
          capture="user"
          onChange={handleImageUpload}
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Welcome, User Name</h1>
        <p className="text-gray-500">user@example.com</p>
      </div>
    </div>
  );
}