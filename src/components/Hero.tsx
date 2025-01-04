import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";

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
            
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/0c9b5516-6d0d-4761-b5f8-d3ab135daffb.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
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
              <Button 
                size="lg" 
                className="bg-[#1e3a8a] hover:bg-[#1e40af]"
                asChild
              >
                <Link to="/login">SIGN UP</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
                asChild
              >
                <Link to="/login">BOOK APPOINTMENT</Link>
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