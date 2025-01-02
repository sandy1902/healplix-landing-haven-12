import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X } from "lucide-react";
import { useMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobile();

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
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-primary">
                About
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">Services</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48 bg-white shadow-lg rounded-lg p-2">
                  <DropdownMenuItem>
                    <Link to="/service1" className="w-full">
                      Service 1
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/service2" className="w-full">
                      Service 2
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>

        {isMobile && isOpen && (
          <div className="pb-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-600 hover:text-primary px-4 py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-primary px-4 py-2"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/service1"
                className="text-gray-600 hover:text-primary px-4 py-2"
                onClick={toggleMenu}
              >
                Service 1
              </Link>
              <Link
                to="/service2"
                className="text-gray-600 hover:text-primary px-4 py-2"
                onClick={toggleMenu}
              >
                Service 2
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2"
                onClick={toggleMenu}
              >
                <Button className="w-full">Sign Up</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};