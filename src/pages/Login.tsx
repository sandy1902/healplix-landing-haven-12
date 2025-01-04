import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        // Fetch user profile to get role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          let redirectPath = '/dashboard'; // default path
          let welcomeMessage = 'Welcome back!';

          // Role-based redirection
          switch (profile.role) {
            case 'executive':
              redirectPath = '/executive-dashboard';
              welcomeMessage = 'Welcome back, Executive!';
              break;
            case 'doctor':
              redirectPath = '/doctor-dashboard';
              welcomeMessage = 'Welcome back, Doctor!';
              break;
            default:
              redirectPath = '/dashboard';
              welcomeMessage = 'Welcome back!';
          }

          toast({
            title: welcomeMessage,
            description: "You have successfully logged in.",
          });
          navigate(redirectPath);
        }
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
              view="sign_in"
            />

            <div className="text-center mt-6">
              <p className="text-[#7E69AB] font-sans">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-[#9b87f5] hover:text-[#7E69AB] font-semibold transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}