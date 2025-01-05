import { Link } from "react-router-dom";
import { Home, Search, LayoutDashboard } from "lucide-react";
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

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="search">
            <AccordionTrigger className="px-4 py-2">
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Link
                to="/search-doctors"
                className="text-gray-600 hover:text-primary px-8 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Find a Doctor
              </Link>
              <Link
                to="/search-hospitals"
                className="text-gray-600 hover:text-primary px-8 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Find a Hospital
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="dashboards">
            <AccordionTrigger className="px-4 py-2">
              <span className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Dashboards
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-primary px-8 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Subscriber Dashboard
              </Link>
              <Link
                to="/doctor-dashboard"
                className="text-gray-600 hover:text-primary px-8 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Doctor Dashboard
              </Link>
              <Link
                to="/executive-dashboard"
                className="text-gray-600 hover:text-primary px-8 py-2 flex items-center gap-2"
                onClick={onClose}
              >
                Executive Dashboard
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};