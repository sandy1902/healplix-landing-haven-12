export interface Hospital {
  id: string;
  name: string;
  image: string;
  images: string[];
  location: string;
  specialities: string[];
  insuranceProviders: string[];
  rating: number;
  doctors: Doctor[];
}

export interface Doctor {
  name: string;
  qualification: string;
  speciality: string;
}