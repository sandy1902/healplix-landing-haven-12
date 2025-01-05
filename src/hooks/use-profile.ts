import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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
        
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .single();

          setUserProfile({
            first_name: profile?.first_name || "User",
            email: user.email || "",
          });
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
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