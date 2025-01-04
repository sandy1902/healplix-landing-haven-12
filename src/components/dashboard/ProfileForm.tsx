import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

export default function ProfileForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    dob: '',
    address: '',
    city: '',
    district: '',
    state: '',
    pincode: '',
    phoneNumber: '',
    bio: '',
    specialization: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "You must be logged in to update your profile.",
        });
        return;
      }

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: `${formData.firstName} ${formData.lastName}`,
          phone_number: formData.phoneNumber,
          address: `${formData.address}, ${formData.city}, ${formData.district}, ${formData.state}, ${formData.pincode}`,
          bio: formData.bio,
          specialization: formData.specialization
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
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
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input 
            id="phoneNumber" 
            placeholder="Enter phone number" 
            value={formData.phoneNumber}
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
          <Label htmlFor="specialization">Specialization</Label>
          <Input 
            id="specialization" 
            placeholder="Enter specialization (if applicable)" 
            value={formData.specialization}
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

      {/* Bio */}
      <div className="space-y-4">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself"
          value={formData.bio}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}