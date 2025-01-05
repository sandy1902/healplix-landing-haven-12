import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProfileImage from "./profile/ProfileImage";
import ProfileForm from "./profile/ProfileForm";
import { FileText, Clock, PenTool } from "lucide-react";

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
      <div className="flex flex-col items-center p-3 bg-white rounded-lg shadow-md animate-fade-up max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-3 w-full">
          <div className="relative">
            <ProfileImage 
              imagePreview={imagePreview} 
              onImageUpdate={setImagePreview} 
            />
          </div>
          
          <div className="text-center flex-grow">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-xl font-bold text-primary">{profile.name}</h1>
              <p className="text-gray-500">{profile.email}</p>
              <p className="text-sm text-gray-600">{profile.specialization}</p>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="gap-2"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>

          <Card className="w-full mt-3">
            <div className="p-3">
              <div className="flex justify-around">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">150+</p>
                  <p className="text-xs text-gray-500">Patients</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{profile.experience}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <PenTool className="h-4 w-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">4.8</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {isEditing && (
        <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
          <ProfileForm 
            profile={profile}
            isEditing={isEditing}
            setProfile={setProfile}
          />
        </div>
      )}
    </div>
  );
}