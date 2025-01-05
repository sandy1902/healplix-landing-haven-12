import { registerMultipleDoctors } from "../utils/doctorRegistration";

const doctorsData = [
  {
    email: "drdivyarenuka@gmail.com",
    firstName: "B Divya",
    lastName: "Renuka",
    phoneNumber: "9392416475",
    hospitalName: "Divya Hospital",
    hospitalAddress: "Doctors Colony",
    city: "Miryalguda",
    district: "Nalgonda",
    pincode: "508207",
    qualification: "MBBS, DNB",
    specialization: "Obstetrician, Gynecology, Fertility Specialist",
    experience: "6 years",
    consultationFee: 300,
    videoConsultationAvailable: true,
    videoConsultationFee: 400
  },
  {
    email: "drsuresh@gmail.com",
    firstName: "Suresh",
    lastName: "Kumar",
    phoneNumber: "9876543210",
    hospitalName: "City Heart Center",
    hospitalAddress: "Medical Plaza",
    city: "Hyderabad",
    district: "Hyderabad",
    pincode: "500081",
    qualification: "MBBS, MD - Cardiology",
    specialization: "Cardiologist",
    experience: "15 years",
    consultationFee: 800,
    videoConsultationAvailable: true,
    videoConsultationFee: 600
  },
  {
    email: "drpriya@gmail.com",
    firstName: "Priya",
    lastName: "Sharma",
    phoneNumber: "9765432180",
    hospitalName: "Kids Care Hospital",
    hospitalAddress: "Children's Medical Complex",
    city: "Secunderabad",
    district: "Hyderabad",
    pincode: "500003",
    qualification: "MBBS, MD - Pediatrics",
    specialization: "Pediatrician",
    experience: "8 years",
    consultationFee: 500,
    videoConsultationAvailable: true,
    videoConsultationFee: 400
  },
  {
    email: "drrajesh@gmail.com",
    firstName: "Rajesh",
    lastName: "Reddy",
    phoneNumber: "9876543211",
    hospitalName: "Orthopedic Specialty Center",
    hospitalAddress: "Health City",
    city: "Hyderabad",
    district: "Hyderabad",
    pincode: "500032",
    qualification: "MBBS, MS - Orthopedics",
    specialization: "Orthopedic Surgeon",
    experience: "12 years",
    consultationFee: 1000,
    videoConsultationAvailable: true,
    videoConsultationFee: 800
  }
];

const registerAllDoctors = async () => {
  try {
    console.log('Starting doctor registration process...');
    const results = await registerMultipleDoctors(doctorsData);
    console.log('Registration results:', results);
  } catch (error) {
    console.error('Error registering doctors:', error);
  }
};

// Run the registration
registerAllDoctors();