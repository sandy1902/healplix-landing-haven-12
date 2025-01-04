import { Doctor } from "@/types/doctor";

export const formatDoctorData = (
  doctor: { name: string; qualification: string; speciality: string },
  hospitalName?: string
): Doctor => {
  return {
    id: doctor.name.toLowerCase().replace(/\s+/g, '-'),
    name: doctor.name,
    specialization: doctor.speciality,
    qualification: doctor.qualification,
    experience: "5+ years",
    rating: 4.5,
    clinicName: hospitalName || "Main Hospital Clinic",
    location: hospitalName || "Private Clinic",
    clinicVisit: { 
      charges: 500,
      available: true 
    },
    videoConsultation: { 
      charges: 400,
      available: true 
    },
    email: "doctor@hospital.com",
    contactNumber: "+1234567890",
    clinicLocation: hospitalName || "Private Clinic",
    clinicTimings: "9:00 AM - 5:00 PM",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d"
  };
};