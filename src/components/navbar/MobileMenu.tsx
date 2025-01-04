import { Link } from "react-router-dom";
import { Home, Search, User } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export const MobileMenu = ({ isOpen, onClose, isAuthenticated }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg pb-4">
      <div className="flex flex-col space-y-2">
        <Link
          to="/"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <Home className="h-4 w-4" />
          Home
        </Link>
        <Link
          to="/about-us"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          About Us
        </Link>
        <Link
          to="/contact"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          Contact Us
        </Link>
        
        {isAuthenticated ? (
          <>
            <Link
              to="/search-doctors"
              className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
              onClick={onClose}
            >
              <Search className="h-4 w-4" />
              Find a Doctor
            </Link>
            <Link
              to="/search-hospitals"
              className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
              onClick={onClose}
            >
              <Search className="h-4 w-4" />
              Find a Hospital
            </Link>
          </>
        ) : (
          <Link
            to="/login"
            className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
            onClick={onClose}
          >
            <User className="h-4 w-4" />
            Login/Signup
          </Link>
        )}
      </div>
    </div>
  );
};