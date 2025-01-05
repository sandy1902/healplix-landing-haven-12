import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface ProfileInfoProps {
  onEditClick: () => void;
}

export function ProfileInfo({ onEditClick }: ProfileInfoProps) {
  return (
    <div className="text-center flex-grow">
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-xl font-bold text-primary">Welcome, User Name</h1>
        <p className="text-gray-500">user@example.com</p>
        <Button
          variant="outline"
          className="gap-2"
          onClick={onEditClick}
        >
          <Edit2 className="h-4 w-4" />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}