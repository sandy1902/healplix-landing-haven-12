import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function ProfileForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    dob: '',
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    console.log('Form submitted with data:', formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
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
          <Label htmlFor="phoneNumber">Contact Number</Label>
          <Input 
            id="phoneNumber" 
            type="tel" 
            placeholder="Enter contact number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Address</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4 md:col-span-2">
            <Label htmlFor="address">Street Address</Label>
            <Input 
              id="address" 
              placeholder="Enter street address" 
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              placeholder="Enter city" 
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="district">District</Label>
            <Input 
              id="district" 
              placeholder="Enter district" 
              value={formData.district}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              placeholder="Enter state" 
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-4">
            <Label htmlFor="pincode">Pincode</Label>
            <Input 
              id="pincode" 
              placeholder="Enter pincode" 
              value={formData.pincode}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}