import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Home, Info, Search, Mail, LogIn, UserPlus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

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
              <DropdownMenu open={undefined}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 data-[state=open]:text-primary"
                    onMouseEnter={(e) => {
                      const target = e.currentTarget as HTMLButtonElement;
                      target.click();
                    }}
                  >
                    <Search className="h-4 w-4" />
                    Search
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-48 bg-white shadow-lg rounded-lg p-2"
                  onMouseLeave={(e) => {
                    const trigger = document.querySelector('[data-state="open"]') as HTMLButtonElement;
                    if (trigger) trigger.click();
                  }}
                >
                  <DropdownMenuItem>
                    <Link to="/search-doctors" className="w-full">
                      Find Doctors
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/search-hospitals" className="w-full">
                      Find Hospitals
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/contact" className="text-gray-600 hover:text-primary flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
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
            </div>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                to="/about-us"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Info className="h-4 w-4" />
                About Us
              </Link>
              <Link
                to="/search-doctors"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Search className="h-4 w-4" />
                Find Doctors
              </Link>
              <Link
                to="/search-hospitals"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Search className="h-4 w-4" />
                Find Hospitals
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
                onClick={toggleMenu}
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2"
                onClick={toggleMenu}
              >
                <Button className="w-full flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};