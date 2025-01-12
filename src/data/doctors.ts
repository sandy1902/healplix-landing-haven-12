import { Doctor } from "@/types/doctor";

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    qualification: "MBBS, MD",
    specialization: "Cardiologist",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png",
    experience: "10 years",
    rating: 4.5,
    clinicName: "Heart Care Clinic",
    clinicLocation: "123 Medical Street",
    location: "New York",
    videoConsultation: {
      available: true,
      charges: 100
    },
    clinicVisit: {
      available: true,
      charges: 150
    },
    languages: ["English", "Spanish"],
    about: "Experienced cardiologist specializing in preventive cardiology"
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    qualification: "MBBS, MS",
    specialization: "Orthopedic Surgeon",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png",
    experience: "15 years",
    rating: 4.8,
    clinicName: "Ortho Care Center",
    clinicLocation: "456 Health Avenue",
    location: "Los Angeles",
    videoConsultation: {
      available: true,
      charges: 120
    },
    clinicVisit: {
      available: true,
      charges: 180
    },
    languages: ["English", "Mandarin"],
    about: "Specialized in joint replacement and sports injuries"
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    qualification: "MBBS, DNB",
    specialization: "Pediatrician",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png",
    experience: "8 years",
    rating: 4.7,
    clinicName: "Kids Care Clinic",
    clinicLocation: "789 Children's Way",
    location: "Chicago",
    videoConsultation: {
      available: true,
      charges: 90
    },
    clinicVisit: {
      available: true,
      charges: 130
    },
    languages: ["English", "Spanish"],
    about: "Dedicated to providing comprehensive pediatric care"
  },
  {
    id: "4",
    name: "Dr. James Anderson",
    qualification: "MBBS, DM",
    specialization: "Neurologist",
    image: "/lovable-uploads/0f34eb7c-2e0a-4f28-a8b6-f1f533395d1f.png",
    experience: "12 years",
    rating: 4.6,
    clinicName: "Brain & Spine Center",
    clinicLocation: "321 Neuro Street",
    location: "Houston",
    videoConsultation: {
      available: true,
      charges: 150
    },
    clinicVisit: {
      available: true,
      charges: 200
    },
    languages: ["English"],
    about: "Expert in treating neurological disorders"
  }
];