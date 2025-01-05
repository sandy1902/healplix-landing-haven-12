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
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        console.log("Session check:", { session, error: sessionError });

        if (sessionError) {
          console.error("Session error:", sessionError);
          setLoading(false);
          return;
        }

        if (!session?.user) {
          console.log("No active session or user found");
          setLoading(false);
          return;
        }

        console.log("Current user:", session.user);

        // First try to get the existing profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('first_name')
          .eq('id', session.user.id)
          .maybeSingle();

        console.log("Profile fetch result:", { profile, error: profileError });

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load user profile",
          });
          setLoading(false);
          return;
        }

        // If no profile exists, create one
        if (!profile) {
          console.log("No profile found, creating new profile");
          const { data: newProfile, error: insertError } = await supabase
            .from('profiles')
            .insert([{ 
              id: session.user.id, 
              first_name: "User",
              email: session.user.email 
            }])
            .select()
            .single();

          if (insertError) {
            console.error('Error creating profile:', insertError);
            toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to create user profile",
            });
          } else {
            console.log("New profile created:", newProfile);
            setUserProfile({
              first_name: newProfile.first_name || "User",
              email: session.user.email || "",
            });
          }
        } else {
          console.log("Setting existing profile:", profile);
          setUserProfile({
            first_name: profile.first_name || "User",
            email: session.user.email || "",
          });
        }
      } catch (error) {
        console.error('Unexpected error in fetchUserProfile:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unexpected error occurred",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [toast]);

  return { userProfile, loading };
}