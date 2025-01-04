import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DashboardMenu = () => {
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile) {
          setUserRole(profile.role);
        }
      }
    };

    getUserRole();
  }, []);

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
          {(userRole === 'subscriber' || !userRole) && (
            <DropdownMenuItem>
              <Link to="/dashboard" className="w-full font-poppins capitalize text-lg">
                Subscriber Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          {userRole === 'doctor' && (
            <DropdownMenuItem>
              <Link to="/doctor-dashboard" className="w-full font-poppins capitalize text-lg">
                Doctor Dashboard
              </Link>
            </DropdownMenuItem>
          )}
          {userRole === 'executive' && (
            <DropdownMenuItem>
              <Link to="/executive-dashboard" className="w-full font-poppins capitalize text-lg">
                Executive Dashboard
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};