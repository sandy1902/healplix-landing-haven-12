import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import ProfileImage from "./profile/ProfileImage";
import ProfileForm from "./profile/ProfileForm";
import { Badge } from "@/components/ui/badge";

export default function ExecutiveProfile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [approvalStatus, setApprovalStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [profile, setProfile] = useState({
    name: "John Executive",
    email: "john@executive.com",
    phone: "+1 234 567 8900",
    address: "123 Healthcare Street, Medical District",
    position: "Senior Executive",
    bio: "Healthcare executive with 10+ years of experience"
  });

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const getApprovalBadge = () => {
    switch (approvalStatus) {
      case 'pending':
        return <Badge variant="secondary">Pending Approval</Badge>;
      case 'approved':
        return <Badge variant="default">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card>
      <div className="p-4 border-b border-border">
        {getApprovalBadge()}
      </div>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Executive Profile</CardTitle>
          <Button 
            variant={isEditing ? "default" : "secondary"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </Button>
        </div>
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
  );
}