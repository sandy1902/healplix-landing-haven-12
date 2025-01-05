import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface UserMenuProps {
  firstName: string;
  onLogout: () => Promise<void>;
}

export const UserMenu = ({ firstName, onLogout }: UserMenuProps) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await onLogout();
    setOpen(false);
  };

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
            <User className="h-5 w-5" />
            {firstName ? `Hello, ${firstName}` : "Hello, User"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="w-48 bg-white shadow-lg rounded-lg p-2"
          sideOffset={8}
        >
          <DropdownMenuItem onClick={handleLogout}>
            <span className="w-full flex items-center gap-2 font-poppins capitalize text-lg">
              <LogOut className="h-5 w-5" />
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};