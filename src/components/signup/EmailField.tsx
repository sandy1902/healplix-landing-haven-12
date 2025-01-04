import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";

interface EmailFieldProps {
  control: Control<any>;
}

export function EmailField({ control }: EmailFieldProps) {
  return (
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
  );
}