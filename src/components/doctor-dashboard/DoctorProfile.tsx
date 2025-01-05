import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProfileImage from "./profile/ProfileImage";
import ProfileForm from "./profile/ProfileForm";

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
      <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg animate-fade-up">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="relative">
            <ProfileImage 
              imagePreview={imagePreview} 
              onImageUpdate={setImagePreview} 
            />
          </div>
          
          <div className="text-center flex-grow">
            <div className="flex flex-col items-center gap-3">
              <h1 className="text-xl font-bold text-primary">{profile.name}</h1>
              <p className="text-gray-500">{profile.email}</p>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="gap-2"
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </Button>
            </div>
          </div>

          <Card className="w-full mt-4">
            <div className="p-4">
              <div className="flex justify-around">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <svg className="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                      <path d="M9 18h6" />
                      <path d="M12 22v-4" />
                      <path d="M14 4h.01" />
                      <path d="M19 3v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V3" />
                      <path d="M3 15h18" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">150+</p>
                  <p className="text-xs text-gray-500">Patients</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <svg className="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 8v4l3 3" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{profile.experience}</p>
                  <p className="text-xs text-gray-500">Experience</p>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <svg className="h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium">4.8</p>
                  <p className="text-xs text-gray-500">Rating</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-up" style={{ animationDelay: "100ms" }}>
        <ProfileForm 
          profile={profile}
          isEditing={isEditing}
          setProfile={setProfile}
        />
      </div>
    </div>
  );
}