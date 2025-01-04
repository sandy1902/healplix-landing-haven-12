import { Button } from "@/components/ui/button";
import { useRef, useEffect, useState } from "react";
import { FlipHorizontal } from "lucide-react";

interface CameraModalProps {
  onCapture: (imageDataUrl: string) => void;
  onClose: () => void;
  stream: MediaStream | null;
}

export function CameraModal({ onCapture, onClose, stream }: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        onCapture(imageDataUrl);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-xl max-w-sm w-full">
        <div className="relative">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-[300px] rounded-lg mb-4 object-cover"
          />
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-2 right-2 rounded-full"
            onClick={() => {
              onClose();
              setFacingMode(prev => prev === "user" ? "environment" : "user");
            }}
          >
            <FlipHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleCapture}>Capture Photo</Button>
        </div>
      </div>
    </div>
  );
}