import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";
import { SearchDropdown } from "./navbar/SearchDropdown";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/'); // Changed from '/login' to '/'
    }
  };

  const session = supabase.auth.getSession();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-[#9b87f5] text-white py-2 w-full">
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
              <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            ) : (
              <div className="flex items-center space-x-6 font-poppins">
                <Link to="/" className="text-gray-700 hover:text-primary capitalize text-lg">Home</Link>
                <Link to="/about-us" className="text-gray-700 hover:text-primary capitalize text-lg">About us</Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary capitalize text-lg">Contact us</Link>
                <SearchDropdown />
                <div className="flex items-center space-x-3">
                  {session ? (
                    <>
                      <Link to="/dashboard">
                        <Button variant="outline" className="font-roboto text-base">
                          Dashboard
                        </Button>
                      </Link>
                      <Button 
                        onClick={handleLogout}
                        variant="outline" 
                        className="font-roboto text-base flex items-center gap-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button variant="outline" className="font-roboto text-base">
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button className="bg-[#1e40af] hover:bg-[#1e3a8a] font-roboto text-base">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} />
    </>
  );
}