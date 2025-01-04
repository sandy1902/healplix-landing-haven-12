import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SignupFormFieldsProps {
  control: Control<any>;
}

export function SignupFormFields({ control }: SignupFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Name</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your full name" 
                {...field}
                className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 font-sans"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Email</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your email" 
                {...field}
                className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 font-sans"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="phoneNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Phone Number</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter your phone number" 
                {...field}
                className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 font-sans"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...field}
                  className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 pr-10 font-sans"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-[#7E69AB]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#7E69AB]" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#1A1F2C] text-base font-medium font-sans">Confirm Password</FormLabel>
            <FormControl>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  {...field}
                  className="bg-white/50 backdrop-blur-sm border-[#9b87f5]/20 focus:border-[#9b87f5]/50 focus:ring-[#9b87f5]/50 pr-10 font-sans"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-[#7E69AB]" />
                  ) : (
                    <Eye className="h-4 w-4 text-[#7E69AB]" />
                  )}
                </Button>
              </div>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </>
  );
}