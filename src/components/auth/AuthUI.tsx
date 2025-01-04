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

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#1e3a8a',
                brandAccent: '#1e40af',
              },
            },
          },
          className: {
            input: 'hidden',
            label: 'hidden',
            container: 'password-container-hide',
          },
        }}
        providers={[]}
        redirectTo={window.location.origin}
        localization={{
          variables: {
            sign_up: {
              email_label: "Email address",
              email_input_placeholder: "Your email address",
              password_label: "",
              password_input_placeholder: "",
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