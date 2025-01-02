import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileSummary() {
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would typically handle the file upload to your backend
      console.log('Uploading file:', file);
      toast({
        title: "Profile Picture Updated",
        description: "Your profile picture has been successfully updated.",
      });
    }
  };

  return (
    <div className="flex items-center gap-4 py-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <label htmlFor="avatar-upload" className="absolute -bottom-2 -right-2">
          <div className="rounded-full bg-primary p-1.5 cursor-pointer hover:bg-primary/90 transition-colors">
            <Upload className="h-4 w-4 text-white" />
          </div>
          <input
            type="file"
            id="avatar-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      </div>
      <div>
        <h1 className="text-2xl font-bold">Welcome, User Name</h1>
        <p className="text-gray-500">user@example.com</p>
      </div>
    </div>
  );
}