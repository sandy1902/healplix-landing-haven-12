import { Doctor } from "@/types/doctor";

export const formatDoctorData = (
  doctor: { 
    name: string; 
    qualification: string; 
    speciality: string; 
  }, 
  hospitalName?: string
): Doctor => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    name: doctor.name,
    image: "",
    qualification: doctor.qualification,
    specialization: doctor.speciality,
    experience: "Not specified",
    rating: 0,
    clinicName: hospitalName || "Not specified",
    clinicLocation: "Not specified",
    location: "Not specified",
    videoConsultation: {
      available: true,
      charges: 500
    },
    clinicVisit: {
      available: true,
      charges: 300
    },
    languages: ["English"],
    about: `Dr. ${doctor.name} is a qualified healthcare professional specializing in ${doctor.speciality}.`,
    services: []
  };
};