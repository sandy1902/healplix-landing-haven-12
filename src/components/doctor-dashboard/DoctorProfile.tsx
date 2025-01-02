import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProfileImage from "./profile/ProfileImage";
import ProfileForm from "./profile/ProfileForm";
import PatientRecords from "./patient/PatientRecords";
import Prescription from "./patient/Prescription";

export default function DoctorProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [profile, setProfile] = useState({
    name: "Dr. Sarah Wilson",
    specialization: "Cardiologist",
    qualifications: "MBBS, MD - Cardiology",
    experience: "15 years",
    description: "Experienced cardiologist specializing in preventive cardiology and heart disease management.",
    email: "dr.sarah@example.com",
    contactNumber: "+1 234 567 8900",
    clinicName: "Heart Care Clinic",
    clinicLocation: "123 Medical Center Drive, Los Angeles, CA 90001",
    clinicTimings: "Mon-Sat: 9:00 AM - 5:00 PM"
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
          <div className="flex items-center space-x-4">
            <ProfileImage 
              imagePreview={imagePreview} 
              onImageUpdate={setImagePreview} 
            />
          </div>
          <ProfileForm 
            profile={profile}
            isEditing={isEditing}
            setProfile={setProfile}
          />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PatientRecords />
        <Prescription />
      </div>
    </div>
  );
}