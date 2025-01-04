import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState } from "react";

export const DashboardMenu = () => {
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
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-56 bg-white shadow-lg rounded-lg p-2"
          sideOffset={8}
        >
          <DropdownMenuItem>
            <Link to="/dashboard" className="w-full font-poppins capitalize text-lg">
              User Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/doctor-dashboard" className="w-full font-poppins capitalize text-lg">
              Doctor Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/executive-dashboard" className="w-full font-poppins capitalize text-lg">
              Executive Dashboard
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};