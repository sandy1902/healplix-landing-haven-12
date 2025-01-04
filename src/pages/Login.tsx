import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { AuthUI } from "@/components/auth/AuthUI";
import { Navbar } from "@/components/Navbar";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f0f9ff]">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto text-center mb-8">
          <h1 className="text-3xl font-bold text-[#1e3a8a] mb-4">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your healthcare dashboard</p>
        </div>
        <AuthUI />
      </div>
    </div>
  );
}