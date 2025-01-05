import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export type UserProfile = {
  first_name: string;
  email: string;
};

export function useProfile() {
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<UserProfile>({ 
    first_name: "", 
    email: "" 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        console.log("Current user:", user); // Debug log
        
        if (!user) {
          console.log("No user found"); // Debug log
          setLoading(false);
          return;
        }

        const { data: profile, error } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        console.log("Profile data:", profile); // Debug log
        console.log("Profile error:", error); // Debug log

        if (error) {
          console.error('Error fetching user profile:', error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load user profile",
          });
          return;
        }

        setUserProfile({
          first_name: profile?.first_name || "User",
          email: user.email || "",
        });
      } catch (error) {
        console.error('Error in fetchUserProfile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast]);

  return { userProfile, loading };
}