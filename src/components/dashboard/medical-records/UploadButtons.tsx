import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";

interface UploadButtonsProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
}

export function UploadButtons({ onUploadClick, onCameraClick }: UploadButtonsProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-xs mx-auto px-4 sm:px-0">
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={onUploadClick}
        className="w-full mb-2"
      >
        <Upload className="h-4 w-4 mr-2" />
        Upload Record
      </Button>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={onCameraClick}
        className="w-full"
      >
        <Camera className="h-4 w-4 mr-2" />
        Capture Image
      </Button>
    </div>
  );
}