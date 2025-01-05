import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useCurrentUser() {
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setUserId(user.id);
        }
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, []);

  return { userId, loading };
}