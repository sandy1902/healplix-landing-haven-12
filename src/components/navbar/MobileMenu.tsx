import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, Search, LogIn, UserPlus, LayoutDashboard } from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="pb-4">
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
          <Info className="h-4 w-4" />
          About Us
        </Link>
        <Link
          to="/search-doctors"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <Search className="h-4 w-4" />
          Find Doctors
        </Link>
        <Link
          to="/search-hospitals"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <Search className="h-4 w-4" />
          Find Hospitals
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <LayoutDashboard className="h-4 w-4" />
          User Dashboard
        </Link>
        <Link
          to="/doctor-dashboard"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <LayoutDashboard className="h-4 w-4" />
          Doctor Dashboard
        </Link>
        <Link
          to="/executive-dashboard"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <LayoutDashboard className="h-4 w-4" />
          Executive Dashboard
        </Link>
        <Link
          to="/login"
          className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
          onClick={onClose}
        >
          <LogIn className="h-4 w-4" />
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2"
          onClick={onClose}
        >
          <Button className="w-full flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};