import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ImageCarouselProps {
  images: string[];
}

export function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="relative">
      <div className="mb-4">
        <img
          src={images[currentImageIndex]}
          alt={`Hospital Image ${currentImageIndex + 1}`}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>
      <ScrollArea className="w-full whitespace-nowrap rounded-lg">
        <div className="flex space-x-4 p-4">
          {images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div 
                  className="relative group cursor-pointer"
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Hospital Image ${index + 1}`}
                    className={`h-24 w-24 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 ${
                      index === currentImageIndex ? 'ring-2 ring-primary' : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                    <ZoomIn className="text-white h-6 w-6" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <img
                  src={image}
                  alt={`Hospital Image ${index + 1}`}
                  className="w-full h-auto object-contain"
                />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </ScrollArea>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-32 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
        onClick={previousImage}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-32 -translate-y-1/2 bg-white/80 hover:bg-white z-10"
        onClick={nextImage}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}