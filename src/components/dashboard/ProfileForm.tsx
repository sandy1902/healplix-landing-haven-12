import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PersonalInfoForm } from "./profile/PersonalInfoForm";
import { AddressForm } from "./profile/AddressForm";
import { BioForm } from "./profile/BioForm";

export default function ProfileForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
      <PersonalInfoForm formData={formData} handleChange={handleChange} />
      <AddressForm formData={formData} handleChange={handleChange} />
      <BioForm bio={formData.bio} handleChange={handleChange} />
      
      <div className="flex justify-end">
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
}