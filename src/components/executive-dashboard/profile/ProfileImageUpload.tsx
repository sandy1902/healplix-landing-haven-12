import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProfileImageUploadProps {
  imagePreview: string | null;
  onImageUpdate: (image: string | null) => void;
}

export default function ProfileImageUpload({ imagePreview, onImageUpdate }: ProfileImageUploadProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        onImageUpdate(reader.result as string);
        toast({
          title: "Image Uploaded",
          description: "Your profile picture has been updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <Avatar className="h-24 w-24">
        <AvatarImage src={imagePreview || "/placeholder.svg"} alt="Profile" />
        <AvatarFallback>EX</AvatarFallback>
      </Avatar>
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      <Button
        type="button"
        size="icon"
        variant="secondary"
        className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-4 w-4" />
      </Button>
    </div>
  );
}