import { Button } from "@/components/ui/button";
import { Heart, Brain, Droplet, User, Baby, Scissors } from "lucide-react";

const specialties = [
  {
    icon: Heart,
    title: "Cardiology",
    doctors: "25+ Doctors"
  },
  {
    icon: Brain,
    title: "Neurology",
    doctors: "20+ Doctors"
  },
  {
    icon: Droplet,
    title: "Nephrology",
    doctors: "15+ Doctors"
  },
  {
    icon: User,
    title: "Urology",
    doctors: "18+ Doctors"
  },
  {
    icon: Baby,
    title: "Pediatrics",
    doctors: "30+ Doctors"
  },
  {
    icon: Scissors,
    title: "Laparoscopic Surgery",
    doctors: "12+ Doctors"
  },
  {
    icon: Baby,
    title: "Fertility Care",
    doctors: "15+ Doctors"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 text-[#00b341] mb-4">
            <span className="text-lg font-normal">OUR COMPREHENSIVE SPECIALTIES</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e3a8a]">
            From Routine Check-Ups To Advanced Treatments, We've Got You Covered.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialties.map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 text-center shadow-lg hover:shadow-xl transition-shadow animate-scale-in"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-[#1e3a8a]" />
                </div>
                <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{specialty.title}</h3>
                <p className="text-gray-600 mb-4">{specialty.doctors}</p>
                <Button 
                  variant="outline" 
                  className="w-full border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                >
                  MAKE AN APPOINTMENT
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};