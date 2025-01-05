export interface Doctor {
  id: string;
  name: string;
  image: string;
  qualification: string;
  specialization: string;
  experience: string;
  rating: number;
  videoConsultation: boolean;
  videoConsultationFee: number | null;
  consultationFee: number;
  availability: {
    days: string[];
    timeSlots: string[];
  };
  location: string;
  languages: string[];
  about: string;
}

export interface DoctorProfile {
  id: string;
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