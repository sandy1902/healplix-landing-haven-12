import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileSummary() {
  return (
    <div className="flex items-center gap-4 py-6">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/placeholder.svg" />
        <AvatarFallback>UN</AvatarFallback>
      </Avatar>
      <div>
        <h1 className="text-2xl font-bold">Welcome, User Name</h1>
        <p className="text-gray-500">user@example.com</p>
      </div>
    </div>
  );
}