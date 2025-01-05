import { Doctor } from "@/types/doctor";

export const sampleDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Rohith Kumar',
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=2070&auto=format&fit=crop",
    qualification: 'MBBS, MD',
    specialization: 'Cardiologist',
    experience: '12+ years',
    clinicName: 'City Heart Hospital',
    location: 'Hyderabad, Telangana',
    rating: 4.8,
    email: 'dr.rohith@cityheart.com',
    contactNumber: '+91 9876543210',
    clinicLocation: '123 Medical Lane, Hyderabad',
    clinicTimings: '9:00 AM - 5:00 PM',
    services: ['ECG', 'Echo', 'Stress Test'],
    videoConsultation: {
      available: true,
      charges: 800
    },
    clinicVisit: {
      available: true,
      charges: 1000
    }
  },
  {
    id: '2',
    name: 'Dr. Divya Renuka',
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
    qualification: 'MBBS, MS',
    specialization: 'Gynecologist',
    experience: '8+ years',
    clinicName: "Women's Care Center",
    location: 'Hyderabad, Telangana',
    rating: 4.7,
    email: 'dr.divya@womenscare.com',
    contactNumber: '+91 9876543211',
    clinicLocation: '456 Health Street, Hyderabad',
    clinicTimings: '10:00 AM - 6:00 PM',
    services: ['Prenatal Care', 'Women Health', 'Fertility Treatment'],
    videoConsultation: {
      available: true,
      charges: 700
    },
    clinicVisit: {
      available: true,
      charges: 900
    }
  },
  {
    id: '3',
    name: 'Dr. Sandeep Kumar',
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=2070&auto=format&fit=crop",
    qualification: 'MBBS, MD',
    specialization: 'Neurologist',
    experience: '15+ years',
    clinicName: 'Brain & Spine Center',
    location: 'Hyderabad, Telangana',
    rating: 4.9,
    email: 'dr.sandeep@neurocare.com',
    contactNumber: '+91 9876543212',
    clinicLocation: '789 Brain Street, Hyderabad',
    clinicTimings: '9:00 AM - 7:00 PM',
    services: ['EEG', 'EMG', 'Nerve Conduction Studies'],
    videoConsultation: {
      available: true,
      charges: 1200
    },
    clinicVisit: {
      available: true,
      charges: 1500
    }
  }
];