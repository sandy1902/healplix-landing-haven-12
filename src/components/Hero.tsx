import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-[90vh] bg-[#f0f9ff]">
      <div className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-white rounded-full px-4 py-2 text-[#00b341]">
              <Clock className="h-5 w-5" />
              <span>24/7 EMERGENCY SERVICE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#1e3a8a] leading-tight">
              Caring for <span className="text-[#00b341] relative">Health
                <span className="absolute bottom-0 left-0 w-full h-1 bg-[#00b341]"></span>
              </span>
              <br />
              Always, There for You
            </h1>
            
            <p className="text-gray-600 text-lg leading-relaxed">
              Experience personalized and affordable healthcare solutions.
              Convenient bookings, expert consultations, and specialized
              care at your fingertips.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-[#1e3a8a] hover:bg-[#1e40af]">
                SIGN UP
              </Button>
              <Button size="lg" variant="outline" className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white">
                BOOK APPOINTMENT
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="/lovable-uploads/3c73ff5a-634a-47be-a516-4f5b6c299780.png"
              alt="Doctor"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};