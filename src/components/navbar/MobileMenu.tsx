import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Info, Search, Mail, LogIn, UserPlus, LogOut, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const [session, setSession] = useState<any>(null);
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      } else {
        setFirstName("");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .single();
    
    if (profile?.full_name) {
      setFirstName(profile.full_name.split(' ')[0]);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
      onClose();
    }
  };

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
        
        {session ? (
          <>
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
              <User className="h-4 w-4" />
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2 w-full text-left"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/contact"
              className="text-gray-600 hover:text-primary px-4 py-2 flex items-center gap-2"
              onClick={onClose}
            >
              <Mail className="h-4 w-4" />
              Contact Us
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
          </>
        )}
      </div>
    </div>
  );
};