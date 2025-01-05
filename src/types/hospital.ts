export interface Hospital {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialities: string[];
  image: string;
  doctors: {
    name: string;
    qualification: string;
    speciality: string;
    image: string;
  }[];
  insuranceProviders: string[];
}