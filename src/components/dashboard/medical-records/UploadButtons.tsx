import { Button } from "@/components/ui/button";
import { Upload, Camera } from "lucide-react";

interface UploadButtonsProps {
  onUploadClick: () => void;
  onCameraClick: () => void;
}

export function UploadButtons({ onUploadClick, onCameraClick }: UploadButtonsProps) {
  return (
    <div className="flex flex-col space-y-2 w-40 mx-auto">
      <Button variant="secondary" size="sm" onClick={onUploadClick}>
        <Upload className="h-4 w-4 mr-2" />
        Upload Record
      </Button>
      <Button variant="secondary" size="sm" onClick={onCameraClick}>
        <Camera className="h-4 w-4 mr-2" />
        Capture Image
      </Button>
    </div>
  );
}