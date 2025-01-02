import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Info, Mail, LogIn, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";
import { SearchDropdown } from "./navbar/SearchDropdown";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const { isAuthenticated } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Healplix</span>
          </Link>

          {isMobile ? (
            <div className="flex items-center">
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X /> : <Menu />}
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link to="/about-us" className="text-gray-600 hover:text-primary flex items-center gap-2">
                <Info className="h-4 w-4" />
                About Us
              </Link>
              {isAuthenticated && <SearchDropdown />}
              <Link to="/contact" className="text-gray-600 hover:text-primary flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-primary flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </Link>
                  <Link to="/signup">
                    <Button className="flex items-center gap-2">
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              ) : (
                <Button variant="ghost" onClick={() => {}}>
                  Logout
                </Button>
              )}
            </div>
          )}
        </div>

        <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
      </div>
    </nav>
  );
};