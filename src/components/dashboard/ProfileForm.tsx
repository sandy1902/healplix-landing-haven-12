import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfileForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" placeholder="Enter first name" />
        </div>
        <div className="space-y-4">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" placeholder="Enter last name" />
        </div>
        <div className="space-y-4">
          <Label htmlFor="age">Age</Label>
          <Input id="age" type="number" placeholder="Enter age" />
        </div>
        <div className="space-y-4">
          <Label htmlFor="gender">Gender</Label>
          <select 
            id="gender" 
            className="w-full h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="space-y-4">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" />
        </div>
      </div>

      {/* Address Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input id="address" placeholder="Enter street address" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="Enter city" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="district">District</Label>
            <Input id="district" placeholder="Enter district" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Enter state" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="pincode">Pincode</Label>
            <Input id="pincode" placeholder="Enter pincode" />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}