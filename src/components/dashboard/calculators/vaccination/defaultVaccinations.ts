import { format, addMonths } from "date-fns";

export interface Vaccination {
  id: string;
  name: string;
  date: string;
  completed: boolean;
  recommendedAge: string;
  dueDate: string;
}

export const defaultVaccinations: Vaccination[] = [
  { 
    id: "1", 
    name: "BCG", 
    date: "", 
    completed: false,
    recommendedAge: "At birth",
    dueDate: format(new Date(), 'yyyy-MM-dd')
  },
  { 
    id: "2", 
    name: "Hepatitis B", 
    date: "", 
    completed: false,
    recommendedAge: "0-2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "3", 
    name: "DTaP", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "4", 
    name: "IPV", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "5", 
    name: "Hib", 
    date: "", 
    completed: false,
    recommendedAge: "2 months",
    dueDate: format(addMonths(new Date(), 2), 'yyyy-MM-dd')
  },
  { 
    id: "6", 
    name: "MMR", 
    date: "", 
    completed: false,
    recommendedAge: "12 months",
    dueDate: format(addMonths(new Date(), 12), 'yyyy-MM-dd')
  },
  { 
    id: "7", 
    name: "Varicella", 
    date: "", 
    completed: false,
    recommendedAge: "12-15 months",
    dueDate: format(addMonths(new Date(), 12), 'yyyy-MM-dd')
  },
];