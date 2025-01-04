import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";
import { SearchDropdown } from "./navbar/SearchDropdown";

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
            <a href="#" className="hover:opacity-80">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:opacity-80">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:opacity-80">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:opacity-80">
              <Linkedin size={20} />
            </a>
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
              <div className="flex items-center space-x-6 font-poppins">
                <Link to="/" className="text-gray-700 hover:text-primary capitalize">Home</Link>
                <Link to="/about-us" className="text-gray-700 hover:text-primary capitalize">About us</Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary capitalize">Contact us</Link>
                <SearchDropdown />
                <div className="flex items-center space-x-3">
                  <Link to="/login">
                    <Button variant="outline" className="font-roboto">
                      Login
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] font-roboto">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </>
  );
};