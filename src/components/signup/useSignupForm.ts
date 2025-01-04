import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: z.string(),
  role: z.enum(["user", "doctor", "executive"], {
    required_error: "Please select a role",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function useSignupForm() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      role: "user",
    },
  });

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.startsWith('91') ? `+${cleaned}` : `+91${cleaned}`;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log('Starting signup process with values:', {
        ...values,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]'
      });

      const formattedPhone = formatPhoneNumber(values.phoneNumber);
      console.log('Formatted phone number:', formattedPhone);
      
      // First, create the auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        phone: formattedPhone,
        options: {
          data: {
            full_name: values.name,
            role: values.role,
            phone_number: formattedPhone,
          },
        },
      });

      if (signUpError) {
        console.error('Signup error:', signUpError);
        throw signUpError;
      }

      console.log('Auth signup successful:', {
        user: authData.user ? {
          id: authData.user.id,
          email: authData.user.email,
          phone: authData.user.phone,
          role: authData.user.user_metadata?.role,
        } : null,
        session: authData.session ? 'Session created' : 'No session'
      });

      toast({
        title: "Account created successfully!",
        description: "Please check your email for verification link before logging in.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error('Error in signup process:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create account",
        variant: "destructive",
      });
    }
  };

  return { form, onSubmit };
}