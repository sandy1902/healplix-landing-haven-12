export interface Doctor {
  id: string;
  name: string;
  image: string;
  qualification: string;
  specialization: string;
  experience: string;
  rating: number;
  clinicName: string;
  clinicLocation: string;
  location: string;
  videoConsultation: {
    available: boolean;
    charges: number;
  };
  clinicVisit: {
    available: boolean;
    charges: number;
  };
  languages: string[];
  about: string;
  services?: string[];
}