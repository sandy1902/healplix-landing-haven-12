import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      // Fetch user profile to get role
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      if (profileError) throw profileError;

      toast({
        title: "Success",
        description: "Successfully logged in",
      });

      // Navigate based on role
      switch (profileData.role) {
        case 'doctor':
          navigate('/doctor-dashboard');
          break;
        case 'executive':
          navigate('/executive-dashboard');
          break;
        default:
          navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5] font-sans"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="border-[#9b87f5]/20 focus:border-[#9b87f5] focus:ring-[#9b87f5] pr-10 font-sans"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Link
            to="/forgot-password"
            className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors text-sm font-medium font-sans"
          >
            Forgot Password?
          </Link>
        </div>

        <Button 
          type="submit" 
          className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white font-sans"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <div className="text-center mt-4">
          <p className="text-[#1A1F2C] font-sans">
            Don't have an account?{" "}
            <Link 
              to="/signup" 
              className="text-[#9b87f5] hover:text-[#7E69AB] transition-colors font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}