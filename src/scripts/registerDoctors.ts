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
    qualification: "MBBS,DNB",
    specialization: "Obstetrician,Gynecolgy,Fertility Specialist",
    experience: "6years",
    consultationFee: 300,
    videoConsultationAvailable: true,
    videoConsultationFee: 400
  },
  // ... Add the rest of the doctors data here
];

const registerAllDoctors = async () => {
  try {
    const results = await registerMultipleDoctors(doctorsData);
    console.log('Registration results:', results);
  } catch (error) {
    console.error('Error registering doctors:', error);
  }
};

registerAllDoctors();