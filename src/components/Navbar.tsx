import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#6366f1] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span>Phone: +91 9704183466</span>
            <span>Email: info@healplix.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow Us On:</span>
            <a href="#" className="hover:opacity-80">Facebook</a>
            <a href="#" className="hover:opacity-80">Twitter</a>
            <a href="#" className="hover:opacity-80">Instagram</a>
            <a href="#" className="hover:opacity-80">LinkedIn</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/09637a17-236d-44c0-8a5f-aa2d26ea3cd2.png" 
                alt="Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {isMobile ? (
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            ) : (
              <div className="flex items-center space-x-6">
                <Link to="/" className="text-gray-700 hover:text-primary">HOME</Link>
                <Link to="/about-us" className="text-gray-700 hover:text-primary">ABOUT US</Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary">CONTACT US</Link>
                <Link to="/signup" className="text-gray-700 hover:text-primary">SIGN UP</Link>
                <Link to="/login" className="text-gray-700 hover:text-primary">LOGIN</Link>
                <Button className="bg-[#1e40af] hover:bg-[#1e3a8a]">
                  APPOINTMENT NOW
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </>
  );
};