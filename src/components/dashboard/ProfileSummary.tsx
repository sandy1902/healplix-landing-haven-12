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
      // Check if the file is an image
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
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-primary">Welcome, User Name</h1>
        <p className="text-gray-500 mt-1">user@example.com</p>
      </div>
    </div>
  );
}