import { Doctor } from "@/types/doctor";

export const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. John Smith',
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    qualification: 'MBBS, MD',
    specialization: 'General Medicine',
    experience: '10+ years',
    rating: 4.8,
    clinicName: 'Apollo Hospital',
    clinicLocation: 'Room 302',
    location: 'Bangalore',
    videoConsultation: {
      available: true,
      charges: 800
    },
    clinicVisit: {
      available: true,
      charges: 500
    },
    languages: ['English', 'Hindi', 'Kannada'],
    about: 'Dr. John Smith is a highly experienced general physician with over 10 years of practice.',
    services: ['General Checkup', 'Vaccination', 'Health Screening']
  },
  {
    id: '2',
    name: 'Dr. Divya Renuka',
    image: "/lovable-uploads/c3793d63-2d96-4945-8d81-b3c6b8dc672a.png",
    qualification: 'MBBS, MS',
    specialization: 'Gynecologist',
    experience: '8+ years',
    rating: 4.9,
    clinicName: 'Manipal Hospital',
    clinicLocation: 'Room 105',
    location: 'Bangalore',
    videoConsultation: {
      available: true,
      charges: 1000
    },
    clinicVisit: {
      available: true,
      charges: 800
    },
    languages: ['English', 'Hindi', 'Telugu'],
    about: 'Dr. Divya Renuka is a dedicated gynecologist with expertise in women\'s health.',
    services: ['Gynecology Consultation', 'Prenatal Care', 'Women\'s Health']
  },
  {
    id: '3',
    name: 'Dr. Rajesh Kumar',
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop",
    qualification: 'MBBS, DNB',
    specialization: 'Pediatrician',
    experience: '12+ years',
    rating: 4.7,
    clinicName: 'Rainbow Children\'s Hospital',
    clinicLocation: 'Room 203',
    location: 'Bangalore',
    videoConsultation: {
      available: false,
      charges: 0
    },
    clinicVisit: {
      available: true,
      charges: 600
    },
    languages: ['English', 'Hindi', 'Kannada'],
    about: 'Dr. Rajesh Kumar is a skilled pediatrician with extensive experience in child healthcare.',
    services: ['Pediatric Consultation', 'Vaccination', 'Child Growth Monitoring']
  }
];