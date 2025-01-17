import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoProps {
  formData: {
    firstName: string;
    lastName: string;
    age: string;
    gender: string;
    dob: string;
    phoneNumber: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function PersonalInfoSection({ formData, handleChange }: PersonalInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <Label htmlFor="firstName">First Name</Label>
        <Input 
          id="firstName" 
          placeholder="Enter first name" 
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="lastName">Last Name</Label>
        <Input 
          id="lastName" 
          placeholder="Enter last name" 
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="age">Age</Label>
        <Input 
          id="age" 
          type="number" 
          placeholder="Enter age" 
          value={formData.age}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="gender">Gender</Label>
        <select 
          id="gender" 
          className="w-full h-10 px-3 rounded-md border border-input bg-background"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="space-y-4">
        <Label htmlFor="dob">Date of Birth</Label>
        <Input 
          id="dob" 
          type="date" 
          value={formData.dob}
          onChange={handleChange}
        />
      </div>
      <div className="space-y-4">
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input 
          id="phoneNumber" 
          type="tel" 
          placeholder="Enter phone number"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}