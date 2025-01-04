import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BioFormProps {
  bio: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function BioForm({ bio, handleChange }: BioFormProps) {
  return (
    <div className="space-y-4">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        placeholder="Tell us about yourself"
        value={bio}
        onChange={handleChange}
        className="min-h-[100px]"
      />
    </div>
  );
}