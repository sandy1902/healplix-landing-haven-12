import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
              <Tabs defaultValue="home" className="w-auto">
                <TabsList className="bg-accent">
                  <TabsTrigger value="home" asChild>
                    <Link to="/" className="text-sm">Home</Link>
                  </TabsTrigger>
                  <TabsTrigger value="about" asChild>
                    <Link to="/about-us" className="text-sm">About Us</Link>
                  </TabsTrigger>
                  <TabsTrigger value="search-doctors" asChild>
                    <Link to="/search-doctors" className="text-sm">Find Doctor</Link>
                  </TabsTrigger>
                  <TabsTrigger value="search-hospitals" asChild>
                    <Link to="/search-hospitals" className="text-sm">Find Hospital</Link>
                  </TabsTrigger>
                  <TabsTrigger value="dashboard" asChild>
                    <Link to="/dashboard" className="text-sm">Dashboard</Link>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} isAuthenticated={false} />
    </div>
  );
};