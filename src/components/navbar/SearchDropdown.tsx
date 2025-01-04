import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export const SearchDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div 
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <DropdownMenu 
        open={open} 
        onOpenChange={setOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:text-primary font-poppins capitalize text-lg"
          >
            <Search className="h-5 w-5" />
            Search
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-48 bg-white shadow-lg rounded-lg p-2"
          sideOffset={8}
        >
          <DropdownMenuItem>
            <Link to="/search-doctors" className="w-full font-poppins capitalize text-lg">
              Find a Doctor
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/search-hospitals" className="w-full font-poppins capitalize text-lg">
              Find a Hospital
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};