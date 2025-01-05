import { User, Building2, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

export const BottomNav = () => {
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 z-50">
      <div className="flex justify-around items-center">
        <Link
          to="/search-doctors"
          className="flex flex-col items-center gap-1"
        >
          <User className="h-6 w-6 text-primary" />
          <span className="text-xs text-gray-600">Find Doctor</span>
        </Link>

        <Link
          to="/search-hospitals"
          className="flex flex-col items-center gap-1"
        >
          <Building2 className="h-6 w-6 text-primary" />
          <span className="text-xs text-gray-600">Find Hospital</span>
        </Link>

        <Link
          to="/contact"
          className="flex flex-col items-center gap-1"
        >
          <SendHorizontal className="h-6 w-6 text-primary" />
          <span className="text-xs text-gray-600">Submit Enquiry</span>
        </Link>
      </div>
    </div>
  );
};