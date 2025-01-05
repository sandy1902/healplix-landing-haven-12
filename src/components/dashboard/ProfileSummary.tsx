import ProfileImage from "./ProfileImage";
import { useProfile } from "@/hooks/use-profile";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSummary() {
  const { userProfile, loading } = useProfile();
  console.log("📊 ProfileSummary Status:", { 
    loading,
    hasProfile: !!userProfile.first_name,
    profileData: userProfile
  });

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
        <Skeleton className="w-16 h-16 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  if (!userProfile.first_name && !userProfile.email) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-primary">
            No Profile Data Available
          </h1>
          <p className="text-gray-500 mt-1">Please try logging in again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
      <ProfileImage firstName={userProfile.first_name} />
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold text-primary">
          Welcome, {userProfile.first_name || "User"}
        </h1>
        <p className="text-gray-500 mt-1">{userProfile.email || "No email available"}</p>
      </div>
    </div>
  );
}