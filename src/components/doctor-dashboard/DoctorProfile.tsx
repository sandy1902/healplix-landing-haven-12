import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export default function DoctorProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    qualifications: "MBBS, MD - Cardiology",
    experience: "15 years",
    description: "Experienced cardiologist specializing in preventive cardiology and heart disease management.",
    services: "Cardiac Consultation, ECG, Stress Test",
    awards: "Best Cardiologist Award 2023"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Doctor Profile</CardTitle>
          <Button 
            variant={isEditing ? "default" : "secondary"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
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
              <Label htmlFor="qualifications">Qualifications</Label>
              <Input
                id="qualifications"
                value={profile.qualifications}
                onChange={(e) => setProfile({ ...profile, qualifications: e.target.value })}
                readOnly={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={profile.experience}
                onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                readOnly={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services Offered</Label>
            <Textarea
              id="services"
              value={profile.services}
              onChange={(e) => setProfile({ ...profile, services: e.target.value })}
              readOnly={!isEditing}
              className="min-h-[100px]"
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

          <div className="space-y-2">
            <Label htmlFor="awards">Awards & Recognition</Label>
            <Textarea
              id="awards"
              value={profile.awards}
              onChange={(e) => setProfile({ ...profile, awards: e.target.value })}
              readOnly={!isEditing}
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}