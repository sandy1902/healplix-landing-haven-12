import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileFormProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    bio: string;
  };
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

export default function ProfileForm({ profile, isEditing, setProfile }: ProfileFormProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          disabled={!isEditing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={profile.email}
          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          disabled={!isEditing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={profile.phone}
          onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
          disabled={!isEditing}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={profile.address}
          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
          disabled={!isEditing}
        />
      </div>
      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="bio">Bio</Label>
        <Input
          id="bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          disabled={!isEditing}
        />
      </div>
    </div>
  );
}