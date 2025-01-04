import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface PhoneFieldProps {
  control: Control<any>;
}

export function PhoneField({ control }: PhoneFieldProps) {
  return (
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
  );
}