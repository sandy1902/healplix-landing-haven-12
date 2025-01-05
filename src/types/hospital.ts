export interface Hospital {
  id: string;
  name: string;
  address: string;
  city: string;
  district: string;
  phoneNumber?: string;
  managingDirector?: string;
  managingDirectorPhone?: string;
  departments: string[];
  insuranceProviders: string[];
  doctors: {
    name: string;
    qualification: string;
    speciality: string;
    image?: string;
  }[];
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
  image: string;
}