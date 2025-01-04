import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Mail, LogIn, UserPlus } from "lucide-react";
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/09637a17-236d-44c0-8a5f-aa2d26ea3cd2.png" 
              alt="Healplix Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-primary">Healplix</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link to="/about-us" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                <Info className="h-4 w-4" />
                About Us
              </Link>
              <SearchDropdown />
              <Link to="/contact" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
              <Link to="/login" className="text-gray-600 hover:text-primary flex items-center gap-2 transition-colors">
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link to="/signup">
                <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
      </div>
    </nav>
  );
};