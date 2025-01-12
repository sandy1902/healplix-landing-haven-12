import { Button } from "@/components/ui/button";
import { Heart, Brain, Droplet, User, Baby, Scissors, TestTube, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const specialties = [
  {
    icon: Heart,
    title: "Cardiology"
  },
  {
    icon: Brain,
    title: "Neurology"
  },
  {
    icon: Droplet,
    title: "Nephrology"
  },
  {
    icon: User,
    title: "Urology"
  },
  {
    icon: Baby,
    title: "Pediatrics"
  },
  {
    icon: Scissors,
    title: "Laparoscopic Surgery"
  },
  {
    icon: Baby,
    title: "Fertility Care"
  },
  {
    icon: TestTube,
    title: "Oncology"
  }
];

export const Features = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a]">
            Our Specialties
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {specialties.map((specialty, index) => {
            const IconComponent = specialty.icon;
            return (
              <div 
                key={index} 
                className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition-shadow animate-scale-in cursor-pointer"
              >
                <div className="w-12 h-12 mx-auto mb-2 bg-[#f0f9ff] rounded-full flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-[#1e3a8a]" />
                </div>
                <h3 className="text-sm font-medium text-[#1e3a8a]">{specialty.title}</h3>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-8">
          <Link to="/search-doctors">
            <Button 
              variant="ghost" 
              className="text-primary hover:text-primary/90 flex items-center gap-2"
            >
              See All Specialties
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};