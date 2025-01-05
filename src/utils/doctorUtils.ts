import { Doctor, DoctorProfile } from "@/types/doctor";

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

export const transformProfileToDoctor = (profile: DoctorProfile): Doctor => {
  // Get the doctor's image based on their name
  const getDoctorImage = (name: string) => {
    const doctorImages: { [key: string]: string } = {
      "Dr Rohith": "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
      "Dr Divya Renuka": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
      "Dr Rambabu": "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
      "Dr Balaji": "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?q=80&w=2070&auto=format&fit=crop",
      "Dr Sandeep Goud": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop",
    };
    
    const fullName = `${profile.first_name} ${profile.last_name}`.trim();
    return doctorImages[fullName] || "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d";
  };

  return {
    id: profile.id,
    name: `${profile.first_name} ${profile.last_name}`,
    image: getDoctorImage(`${profile.first_name} ${profile.last_name}`),
    qualification: profile.qualification || "MBBS, MD",
    specialization: profile.specialization || "General Medicine",
    experience: profile.experience || "10+ years",
    clinicName: profile.hospital_name || "City Medical Center",
    location: `${profile.city || "Hyderabad"}, ${profile.district || "Telangana"}`,
    rating: 4.5,
    email: "",
    contactNumber: profile.phone_number || "+91 9876543210",
    clinicLocation: profile.hospital_address || "Medical Center, Main Road",
    clinicTimings: "9:00 AM - 5:00 PM",
    videoConsultation: {
      available: profile.video_consultation_available || false,
      charges: profile.video_consultation_fee || 500
    },
    clinicVisit: {
      available: true,
      charges: profile.consultation_fee || 1000
    }
  };
};