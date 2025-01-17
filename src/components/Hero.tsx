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
              Caring for <span className="text-[#00b341]">Health</span>
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
              src="/lovable-uploads/572154e7-48e3-4ed7-b56d-7d0f2948a46d.png"
              alt="Medical Team"
              className="w-full h-auto object-cover rounded-lg shadow-xl animate-fade-up"
            />
          </div>
        </div>
      </div>
    </div>
  );
};