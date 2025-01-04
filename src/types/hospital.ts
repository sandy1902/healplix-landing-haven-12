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
  reviews: Review[];
}

export interface Doctor {
  name: string;
  qualification: string;
  speciality: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}