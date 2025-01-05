import ProfileImage from "./ProfileImage";
import { useProfile } from "@/hooks/use-profile";

export default function ProfileSummary() {
  const { userProfile, loading } = useProfile();

  if (loading) {
    return (
      <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-white rounded-lg shadow-lg animate-fade-up">
        <div className="animate-pulse">Loading...</div>
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
        <p className="text-gray-500 mt-1">{userProfile.email}</p>
      </div>
    </div>
  );
}