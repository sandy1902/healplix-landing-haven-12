import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const SearchDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="flex items-center gap-2 data-[state=open]:text-primary"
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLButtonElement;
            if (!target.getAttribute('data-state') || target.getAttribute('data-state') === 'closed') {
              target.click();
            }
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
          if (trigger) {
            trigger.click();
          }
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
  );
};