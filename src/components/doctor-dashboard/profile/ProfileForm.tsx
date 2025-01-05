import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface ProfileFormProps {
  profile: any;
  isEditing: boolean;
  setProfile: (profile: any) => void;
}

export default function ProfileForm({ profile, isEditing, setProfile }: ProfileFormProps) {
  return (
    <div className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Basic Information</h3>
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
        </div>
      </div>

      <Separator />

      {/* Qualifications & Education */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Qualifications & Education</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="qualifications">Professional Qualifications</Label>
            <Input
              id="qualifications"
              value={profile.qualifications}
              onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
              readOnly={!isEditing}
              placeholder="e.g., MBBS, MD, MS"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">Education Details</Label>
            <Textarea
              id="education"
              value={profile.education}
              onChange={(e) => setProfile({ ...profile, education: e.target.value })}
              readOnly={!isEditing}
              placeholder="List your educational background and institutions"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Specialization & Services */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Specialization & Services</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="specialization">Specialization</Label>
            <Input
              id="specialization"
              value={profile.specialization}
              onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
              readOnly={!isEditing}
              placeholder="e.g., Cardiology, Neurology"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="services">Services Offered</Label>
            <Textarea
              id="services"
              value={profile.services}
              onChange={(e) => setProfile({ ...profile, services: e.target.value })}
              readOnly={!isEditing}
              placeholder="List the medical services you provide"
              className="min-h-[100px]"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Experience */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Professional Experience</h3>
        <div className="space-y-2">
          <Label htmlFor="experience">Work Experience</Label>
          <Textarea
            id="experience"
            value={profile.experience}
            onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
            readOnly={!isEditing}
            placeholder="Detail your professional experience and previous positions"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <Separator />

      {/* Achievements & Awards */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Achievements & Awards</h3>
        <div className="space-y-2">
          <Label htmlFor="achievements">Professional Achievements</Label>
          <Textarea
            id="achievements"
            value={profile.achievements}
            onChange={(e) => setProfile({ ...profile, achievements: e.target.value })}
            readOnly={!isEditing}
            placeholder="List your notable achievements, awards, and recognitions"
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Clinic Information */}
      <Separator />
      
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Clinic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="clinicLocation">Clinic Location</Label>
            <Input
              id="clinicLocation"
              value={profile.clinicLocation}
              onChange={(e) => setProfile({ ...profile, clinicLocation: e.target.value })}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
}