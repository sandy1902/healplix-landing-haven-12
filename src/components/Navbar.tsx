import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Facebook, Twitter, Instagram, Linkedin, LogOut, Search, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { MobileMenu } from "./navbar/MobileMenu";
import { SearchDropdown } from "./navbar/SearchDropdown";
import { UserMenu } from "./navbar/UserMenu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstName, setFirstName] = useState("");
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setFirstName(profile.first_name || "User");
        }
      } else {
        setIsAuthenticated(false);
        setFirstName("");
      }
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setFirstName(profile.first_name || "User");
        }
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        setFirstName("");
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account",
      });
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        title: "Error logging out",
        description: "There was an error logging out. Please try again.",
        variant: "destructive",
      });
    }
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
                <Link to="/contact" className="text-gray-700 hover:text-primary capitalize text-lg">
                  Contact Us
                </Link>
                
                {isAuthenticated ? (
                  <>
                    <SearchDropdown />
                    <UserMenu firstName={firstName} onLogout={handleLogout} />
                  </>
                ) : (
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-primary capitalize text-lg flex items-center gap-2"
                  >
                    <User className="h-5 w-5" />
                    Login/Signup
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={toggleMenu} isAuthenticated={isAuthenticated} />
    </div>
  );
};