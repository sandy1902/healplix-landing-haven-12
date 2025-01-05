import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileImageProps {
  imagePreview: string | null;
  onImageClick: () => void;
}

export function ProfileImage({ imagePreview, onImageClick }: ProfileImageProps) {
  return (
    <div className="relative">
      <Avatar className="h-32 w-32 border-4 border-secondary/20">
        <AvatarImage src={imagePreview || "/placeholder.svg"} className="object-cover" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-0 right-0 rounded-full"
        onClick={onImageClick}
      >
        <Camera className="h-4 w-4" />
      </Button>
    </div>
  );
}