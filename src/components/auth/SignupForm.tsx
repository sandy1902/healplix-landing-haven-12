import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "subscriber",
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match!",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            phone_number: formData.phone,
            role: formData.role,
          },
        },
      });

      if (error) {
        // Check specifically for user_already_exists error
        if (error.message.includes("User already registered")) {
          toast({
            title: "Account already exists",
            description: "This email is already registered. Please try logging in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error signing up",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      toast({
        title: "Success",
        description: "Check your email for the confirmation link!",
      });
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Error signing up",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="signup-password">Password</Label>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2 relative">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Role</Label>
        <RadioGroup
          value={formData.role}
          onValueChange={(value) => setFormData({ ...formData, role: value })}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="subscriber" id="subscriber" />
            <Label htmlFor="subscriber">Subscriber</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="doctor" id="doctor" />
            <Label htmlFor="doctor">Doctor</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="executive" id="executive" />
            <Label htmlFor="executive">Executive</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
};