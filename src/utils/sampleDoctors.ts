import { Doctor } from "@/types/doctor";

export const sampleDoctors: Doctor[] = [
  {
    id: "1",
    name: "Dr. Sarah Wilson",
    image: "/lovable-uploads/90596b33-e062-4036-af14-0be9f996722e.png",
    qualification: "MBBS, MD - Cardiology",
    specialization: "Cardiologist",
    experience: "15 years",
    rating: 4.8,
    clinicName: "UK Hospital",
    clinicLocation: "123 Medical Center Drive, Los Angeles",
    location: "Los Angeles",
    videoConsultation: {
      available: true,
      charges: 1000
    },
    clinicVisit: {
      available: true,
      charges: 1500
    },
    languages: ["English", "Spanish"],
    about: "Dr. Sarah Wilson is a highly experienced cardiologist with expertise in treating various heart conditions.",
    services: [
      "Cardiac Consultation",
      "ECG",
      "Stress Test",
      "Echocardiogram"
    ]
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    image: "/lovable-uploads/90596b33-e062-4036-af14-0be9f996722e.png",
    qualification: "MBBS, MD - Dermatology",
    specialization: "Dermatologist",
    experience: "12 years",
    rating: 4.7,
    clinicName: "UK Hospital",
    clinicLocation: "456 Medical Plaza, San Francisco",
    location: "San Francisco",
    videoConsultation: {
      available: true,
      charges: 800
    },
    clinicVisit: {
      available: true,
      charges: 1200
    },
    languages: ["English", "Mandarin"],
    about: "Dr. Michael Chen is a board-certified dermatologist specializing in both medical and cosmetic dermatology.",
    services: [
      "Skin Consultation",
      "Acne Treatment",
      "Skin Cancer Screening",
      "Cosmetic Procedures"
    ]
  },
  {
    id: "3",
    name: "Dr. Emily Rodriguez",
    image: "/lovable-uploads/90596b33-e062-4036-af14-0be9f996722e.png",
    qualification: "MBBS, MD - Neurology",
    specialization: "Neurologist",
    experience: "10 years",
    rating: 4.9,
    clinicName: "UK Hospital",
    clinicLocation: "789 Healthcare Avenue, Chicago",
    location: "Chicago",
    videoConsultation: {
      available: true,
      charges: 900
    },
    clinicVisit: {
      available: true,
      charges: 1300
    },
    languages: ["English", "Spanish"],
    about: "Dr. Emily Rodriguez is a skilled neurologist with expertise in treating various neurological disorders.",
    services: [
      "Neurological Consultation",
      "EEG",
      "EMG",
      "Nerve Conduction Studies"
    ]
  }
];