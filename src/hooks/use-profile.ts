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
      // Step 1: Check if user is logged in
      console.log("🔍 Step 1: Checking if user is logged in...");
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("❌ Authentication Error:", sessionError.message);
        setLoading(false);
        return;
      }

      if (!session?.user) {
        console.log("❌ No user is logged in. Please log in first.");
        setLoading(false);
        return;
      }

      console.log("✅ User is logged in:", {
        userId: session.user.id,
        email: session.user.email
      });

      // Step 2: Try to fetch user's profile
      console.log("🔍 Step 2: Fetching user profile...");
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name')
        .eq('id', session.user.id)
        .maybeSingle();

      if (profileError) {
        console.error("❌ Profile Fetch Error:", profileError.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load user profile",
        });
        setLoading(false);
        return;
      }

      // Step 3: Handle profile data
      if (!profile) {
        console.log("🆕 No profile found. Creating new profile...");
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
          console.error("❌ Profile Creation Error:", insertError.message);
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to create user profile",
          });
        } else {
          console.log("✅ New profile created successfully:", newProfile);
          setUserProfile({
            first_name: newProfile.first_name || "User",
            email: session.user.email || "",
          });
        }
      } else {
        console.log("✅ Existing profile found:", profile);
        setUserProfile({
          first_name: profile.first_name || "User",
          email: session.user.email || "",
        });
      }

      setLoading(false);
    };

    fetchUserProfile();
  }, [toast]);

  return { userProfile, loading };
}