import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, Search, LayoutDashboard } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showDashboardDropdown, setShowDashboardDropdown] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleSearchDropdown = () => {
    setShowSearchDropdown(!showSearchDropdown);
    setShowDashboardDropdown(false);
  };

  const toggleDashboardDropdown = () => {
    setShowDashboardDropdown(!showDashboardDropdown);
    setShowSearchDropdown(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Bar */}
      <div className="bg-[#6366f1] text-white py-2 w-full">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
            <span className="text-sm md:text-base">Phone: +91 9704183466</span>
            <span className="text-sm md:text-base">Email: info@healplix.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm md:text-base">Follow Us On:</span>
            <a href="#" className="hover:opacity-80">
              <Facebook size={16} className="md:w-5 md:h-5" />
            </a>
            <a href="#" className="hover:opacity-80">
              <Twitter size={16} className="md:w-5 md:h-5" />
            </a>
            <a href="#" className="hover:opacity-80">
              <Instagram size={16} className="md:w-5 md:h-5" />
            </a>
            <a href="#" className="hover:opacity-80">
              <Linkedin size={16} className="md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-sm w-full">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 md:h-24">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/09637a17-236d-44c0-8a5f-aa2d26ea3cd2.png" 
                alt="Logo" 
                className="h-12 md:h-16 w-auto"
              />
            </Link>

            {isMobile ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-6 font-poppins">
                <Link to="/" className="text-gray-700 hover:text-primary capitalize text-lg">
                  Home
                </Link>
                <Link to="/about-us" className="text-gray-700 hover:text-primary capitalize text-lg">
                  About Us
                </Link>

                {/* Search Dropdown */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:text-primary font-poppins capitalize text-lg"
                    onClick={toggleSearchDropdown}
                  >
                    <Search className="h-5 w-5" />
                    Search
                  </Button>
                  
                  {showSearchDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-2 z-50">
                      <Link 
                        to="/search-doctors" 
                        className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
                      >
                        Find a Doctor
                      </Link>
                      <Link 
                        to="/search-hospitals" 
                        className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
                      >
                        Find a Hospital
                      </Link>
                    </div>
                  )}
                </div>

                {/* Dashboards Dropdown */}
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:text-primary font-poppins capitalize text-lg"
                    onClick={toggleDashboardDropdown}
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboards
                  </Button>
                  
                  {showDashboardDropdown && (
                    <div className="absolute left-0 top-full mt-2 w-56 bg-white shadow-lg rounded-lg p-2 z-50">
                      <Link 
                        to="/dashboard" 
                        className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
                      >
                        Subscriber Dashboard
                      </Link>
                      <Link 
                        to="/doctor-dashboard" 
                        className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
                      >
                        Doctor Dashboard
                      </Link>
                      <Link 
                        to="/executive-dashboard" 
                        className="block w-full px-4 py-2 text-base font-poppins capitalize hover:bg-gray-100 rounded-md"
                      >
                        Executive Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} isAuthenticated={false} />
    </div>
  );
};