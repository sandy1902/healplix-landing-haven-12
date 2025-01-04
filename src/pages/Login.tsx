import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
        navigate('/dashboard');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#9b87f5]/5 to-[#7E69AB]/5">
      <Navbar />
      <div className="flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-md">
          <div className="bg-white/20 backdrop-blur-lg rounded-xl shadow-2xl p-8 space-y-6 border border-[#9b87f5]/20">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-[#1A1F2C] font-poppins mb-2">Welcome Back</h1>
              <p className="text-[#7E69AB] font-sans">Login to your account</p>
            </div>
            
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#9b87f5',
                      brandAccent: '#7E69AB',
                    },
                  },
                },
              }}
              providers={[]}
              redirectTo={`${window.location.origin}/dashboard`}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}