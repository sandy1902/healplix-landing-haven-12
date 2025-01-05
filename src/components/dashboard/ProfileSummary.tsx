import { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ProfileImage } from "./profile/ProfileImage";
import { ProfileInfo } from "./profile/ProfileInfo";
import { QuickStats } from "./profile/QuickStats";

export default function ProfileSummary() {
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been successfully updated.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing functionality coming soon.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg animate-fade-up">
        <div className="flex flex-col items-center gap-4 w-full">
          <ProfileImage
            imagePreview={imagePreview}
            onImageClick={handleImageClick}
          />
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          
          <ProfileInfo onEditClick={handleEditProfile} />
          
          <QuickStats />
        </div>
      </div>
    </div>
  );
}