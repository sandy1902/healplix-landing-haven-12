import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 bg-white shadow-lg pb-4">
      <div className="flex flex-col space-y-2">
        <Link
          to="/"
          className="text-gray-600 hover:text-primary px-4 py-2"
          onClick={onClose}
        >
          Home
        </Link>
        <Link
          to="/about-us"
          className="text-gray-600 hover:text-primary px-4 py-2"
          onClick={onClose}
        >
          About Us
        </Link>
        <Link
          to="/search-doctors"
          className="text-gray-600 hover:text-primary px-4 py-2"
          onClick={onClose}
        >
          Find Doctor
        </Link>
        <Link
          to="/search-hospitals"
          className="text-gray-600 hover:text-primary px-4 py-2"
          onClick={onClose}
        >
          Find Hospital
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-600 hover:text-primary px-4 py-2"
          onClick={onClose}
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};