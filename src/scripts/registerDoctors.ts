import { supabase } from "@/integrations/supabase/client";

interface DoctorData {
  email: string;
  first_name: string;
  last_name: string;
  hospital_name: string;
  hospital_address: string;
  city: string;
  district: string;
  pincode: string;
  qualification: string;
  specialization: string;
  experience: string;
  consultation_fee: number;
  video_consultation_available: boolean;
  video_consultation_fee: number;
  phone_number: string;
}

const doctorsData: DoctorData[] = [
  {
    email: "sarah.wilson@example.com",
    first_name: "Sarah",
    last_name: "Wilson",
    hospital_name: "Heart Care Clinic",
    hospital_address: "123 Medical Center Drive",
    city: "Los Angeles",
    district: "Downtown",
    pincode: "90012",
    qualification: "MBBS, MD - Cardiology",
    specialization: "Cardiologist",
    experience: "15 years",
    consultation_fee: 1500,
    video_consultation_available: true,
    video_consultation_fee: 1000,
    phone_number: "+1 (555) 123-4567"
  },
  {
    email: "michael.chen@example.com",
    first_name: "Michael",
    last_name: "Chen",
    hospital_name: "Skin Care Center",
    hospital_address: "456 Medical Plaza",
    city: "San Francisco",
    district: "Mission District",
    pincode: "94110",
    qualification: "MBBS, MD - Dermatology",
    specialization: "Dermatologist",
    experience: "12 years",
    consultation_fee: 1200,
    video_consultation_available: true,
    video_consultation_fee: 800,
    phone_number: "+1 (555) 987-6543"
  },
  {
    email: "emily.patel@example.com",
    first_name: "Emily",
    last_name: "Patel",
    hospital_name: "Family Care Clinic",
    hospital_address: "789 Healthcare Avenue",
    city: "Chicago",
    district: "Lincoln Park",
    pincode: "60614",
    qualification: "MBBS, MD - Family Medicine",
    specialization: "Family Physician",
    experience: "8 years",
    consultation_fee: 1000,
    video_consultation_available: true,
    video_consultation_fee: 700,
    phone_number: "+1 (555) 456-7890"
  }
];

export async function registerDoctors() {
  for (const doctor of doctorsData) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: doctor.email,
        password: "temporary123", // This will be changed when the doctor sets up their account
        options: {
          data: {
            role: "doctor",
            first_name: doctor.first_name,
            last_name: doctor.last_name,
            phone_number: doctor.phone_number
          }
        }
      });

      if (authError) {
        console.error(`Error creating auth user for ${doctor.email}:`, authError);
        continue;
      }

      // Update profile with doctor-specific information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          hospital_name: doctor.hospital_name,
          hospital_address: doctor.hospital_address,
          city: doctor.city,
          district: doctor.district,
          pincode: doctor.pincode,
          qualification: doctor.qualification,
          specialization: doctor.specialization,
          experience: doctor.experience,
          consultation_fee: doctor.consultation_fee,
          video_consultation_available: doctor.video_consultation_available,
          video_consultation_fee: doctor.video_consultation_fee
        })
        .eq('id', authData.user!.id);

      if (profileError) {
        console.error(`Error updating profile for ${doctor.email}:`, profileError);
      } else {
        console.log(`Successfully registered doctor: ${doctor.email}`);
      }
    } catch (error) {
      console.error(`Unexpected error registering ${doctor.email}:`, error);
    }
  }
}

// Uncomment and run this function to register the doctors
// registerDoctors();