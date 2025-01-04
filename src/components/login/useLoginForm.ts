import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const formatPhoneNumber = (phone: string) => {
    // Remove any non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Add +91 prefix if not present and the number starts with a digit
    if (cleaned.match(/^\d/)) {
      return `+91${cleaned}`;
    }
    return cleaned;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      // Determine if the identifier is an email or phone number
      const isEmail = values.identifier.includes('@');
      const credentials = isEmail 
        ? { email: values.identifier, password: values.password }
        : { phone: formatPhoneNumber(values.identifier), password: values.password };

      console.log('Attempting login with credentials:', credentials);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword(credentials);

      if (authError) throw authError;

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
      console.error('Login error:', error);
      toast({
        title: "Error",
        description: "Invalid credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    showPassword,
    setShowPassword,
    isLoading,
    onSubmit,
  };
}