export interface Hospital {
  id: string;
  name: string;
  registrationNumber?: string;
  address?: string;
  city?: string;
  district?: string;
  phoneNumber?: string;
  managingDirector?: string;
  managingDirectorPhone?: string;
  departments: string[];
  insuranceProviders: string[];
  doctors: string[];
  reviews: {
    id: number;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }[];
  rating: number;
  specialities: string[];
  location: string;
}