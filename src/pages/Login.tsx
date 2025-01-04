import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { LoginForm } from "@/components/auth/LoginForm";
import { SignupForm } from "@/components/auth/SignupForm";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile) {
          switch (profile.role) {
            case 'doctor':
              navigate('/doctor-dashboard');
              break;
            case 'executive':
              navigate('/executive-dashboard');
              break;
            default:
              navigate('/dashboard');
              break;
          }

          toast({
            title: "Login successful",
            description: `Welcome back! You've been logged in as ${profile.role}`,
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-accent">
      <Navbar />
      <div className="container mx-auto py-24 px-4">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Welcome to HealPlix</CardTitle>
          </CardHeader>
          <CardContent>
            {isSignUp ? <SignupForm /> : <LoginForm />}
            
            <Button
              type="button"
              variant="link"
              className="w-full mt-4"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}