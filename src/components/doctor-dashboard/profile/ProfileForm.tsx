import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileFormProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

export default function ProfileForm({ profile, isEditing, setProfile }: ProfileFormProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="specialization">Specialization</Label>
          <Input
            id="specialization"
            value={profile.specialization}
            onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <Input
            id="contactNumber"
            value={profile.contactNumber}
            onChange={(e) => setProfile({ ...profile, contactNumber: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clinicName">Clinic Name</Label>
          <Input
            id="clinicName"
            value={profile.clinicName}
            onChange={(e) => setProfile({ ...profile, clinicName: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clinicTimings">Clinic Timings</Label>
          <Input
            id="clinicTimings"
            value={profile.clinicTimings}
            onChange={(e) => setProfile({ ...profile, clinicTimings: e.target.value })}
            readOnly={!isEditing}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="clinicLocation">Clinic Location</Label>
        <Input
          id="clinicLocation"
          value={profile.clinicLocation}
          onChange={(e) => setProfile({ ...profile, clinicLocation: e.target.value })}
          readOnly={!isEditing}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Professional Description</Label>
        <Textarea
          id="description"
          value={profile.description}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
          readOnly={!isEditing}
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}