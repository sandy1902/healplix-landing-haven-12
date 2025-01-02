export interface Hospital {
  id: string;
  name: string;
  image: string;
  location: string;
  specialities: string[];
  insuranceProviders: string[];
  rating: number;
}