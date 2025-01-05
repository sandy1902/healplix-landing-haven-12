import { supabase } from "@/integrations/supabase/client";

interface DoctorData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  hospitalName: string;
  hospitalAddress: string;
  city: string;
  district: string;
  pincode: string;
  qualification: string;
  specialization: string;
  experience: string;
  consultationFee: number;
  videoConsultationAvailable: boolean;
  videoConsultationFee?: number;
}

export const registerDoctor = async (doctor: DoctorData) => {
  try {
    // First, create the user in auth system
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: doctor.email,
      password: "tempPassword123!", // You should generate a secure temporary password
      options: {
        data: {
          role: "doctor",
          phone_number: doctor.phoneNumber
        }
      }
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("No user data returned");

    // The profile will be created automatically through the trigger we already have
    // Update the profile with additional doctor information
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        first_name: doctor.firstName,
        last_name: doctor.lastName,
        hospital_name: doctor.hospitalName,
        hospital_address: doctor.hospitalAddress,
        city: doctor.city,
        district: doctor.district,
        pincode: doctor.pincode,
        qualification: doctor.qualification,
        specialization: doctor.specialization,
        experience: doctor.experience,
        consultation_fee: doctor.consultationFee,
        video_consultation_available: doctor.videoConsultationAvailable,
        video_consultation_fee: doctor.videoConsultationFee
      })
      .eq('id', authData.user.id);

    if (updateError) throw updateError;

    return { success: true, userId: authData.user.id };
  } catch (error) {
    console.error('Error registering doctor:', error);
    throw error;
  }
};

// Function to register multiple doctors
export const registerMultipleDoctors = async (doctors: DoctorData[]) => {
  const results = [];
  for (const doctor of doctors) {
    try {
      const result = await registerDoctor(doctor);
      results.push({ email: doctor.email, ...result });
    } catch (error) {
      results.push({ email: doctor.email, success: false, error });
    }
  }
  return results;
};