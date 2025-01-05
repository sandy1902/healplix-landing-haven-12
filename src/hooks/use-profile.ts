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
        // First, check if we have a session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Current session:", session); // Debug log
        
        if (sessionError) {
          console.error("Session error:", sessionError);
          return;
        }

        if (!session) {
          console.log("No active session found");
          setLoading(false);
          return;
        }

        // Get user from session
        const user = session.user;
        console.log("Current user:", user);

        // Fetch profile data
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', user.id)
          .single();

        console.log("Profile query result:", { data: profile, error: profileError });

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load user profile",
          });
          return;
        }

        if (!profile) {
          console.log("No profile found for user");
          // Create a profile if one doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, first_name: "User" }]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
          }
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