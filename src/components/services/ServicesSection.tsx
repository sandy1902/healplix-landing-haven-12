import { Calendar, Building2, Stethoscope, CreditCard } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import { SectionTitle } from "../ui/SectionTitle";

const services = [
  {
    icon: Calendar,
    title: "Appointment Bookings",
    description: "Book appointments with our specialists online"
  },
  {
    icon: Building2,
    title: "IP Admission",
    description: "Streamlined inpatient admission process"
  },
  {
    icon: Stethoscope,
    title: "Surgery Guidance",
    description: "Expert guidance for surgical procedures"
  },
  {
    icon: CreditCard,
    title: "Cashless Assistance",
    description: "Hassle-free insurance claim assistance"
  }
];

export const ServicesSection = () => (
  <div className="mb-16">
    <SectionTitle title="Our Services" />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} />
      ))}
    </div>
  </div>
);