import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const AuthUI = () => {
  const [role, setRole] = useState("subscriber");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-4 mb-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full"
          />
        </div>
      </div>

      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#1e3a8a',
                brandAccent: '#1e40af',
                inputBackground: 'white',
                inputText: '#1e3a8a',
                inputBorder: 'hsl(var(--input))',
                inputBorderFocus: 'hsl(var(--ring))',
                inputBorderHover: 'hsl(var(--input))',
                inputPlaceholder: '#8E9196',
              },
              borderWidths: {
                inputBorderWidth: '1px',
              },
              radii: {
                borderRadiusButton: '0.375rem',
                buttonBorderRadius: '0.375rem',
                inputBorderRadius: '0.375rem',
              },
            },
          },
          className: {
            input: 'form-input-focus',
          },
        }}
        providers={[]}
        redirectTo={window.location.origin}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email address",
              email_input_placeholder: "Your email address",
              password_label: "Create password",
              password_input_placeholder: "Create a secure password",
              button_label: "Sign up",
            },
          },
        }}
        view="sign_up"
        additionalData={{
          role: role,
          phone_number: phoneNumber,
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="subscriber">Subscriber</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Auth>
    </div>
  );
};