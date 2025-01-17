import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { PersonalInfoSection } from "./profile/PersonalInfoSection";
import { AddressSection } from "./profile/AddressSection";

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
    console.log('Form submitted with data:', formData);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PersonalInfoSection formData={formData} handleChange={handleChange} />
      <AddressSection formData={formData} handleChange={handleChange} />
      
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}