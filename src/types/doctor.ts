export interface Doctor {
  id: string;
  name: string;
  image: string;
  qualification: string;
  specialization: string;
  experience: string;
  clinicName: string;
  location: string;
  rating: number;
  videoConsultation: {
    available: boolean;
    charges: number;
  };
  clinicVisit: {
    available: boolean;
    charges: number;
  };
}